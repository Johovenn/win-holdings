import "server-only";

import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, verify } from "@node-rs/argon2";
import { query } from "@/lib/db";

const SESSION_COOKIE = "win_session";
const SESSION_DAYS = 7;

type User = { id: string; email: string };

function hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
}

export async function createUser(email: string, password: string) {
    const passwordHash = await hash(password);
    const result = await query<{ id: string }>(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         RETURNING id`,
        [email.trim().toLowerCase(), passwordHash],
    );

    const userId = result.rows[0]?.id;
    if (!userId) throw new Error("Unable to create user");

    await query(
        `INSERT INTO admin_users (user_id) VALUES ($1)
         ON CONFLICT (user_id) DO NOTHING`,
        [userId],
    );

    return userId;
}

export async function signIn(email: string, password: string) {
    const result = await query<{ id: string; email: string; password_hash: string }>(
        `SELECT u.id, u.email, u.password_hash
         FROM users u
         INNER JOIN admin_users a ON a.user_id = u.id
         WHERE lower(u.email) = lower($1)
         LIMIT 1`,
        [email.trim()],
    );
    const user = result.rows[0];

    if (!user || !(await verify(user.password_hash, password))) {
        return false;
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
    await query(
        `INSERT INTO sessions (user_id, token_hash, expires_at)
         VALUES ($1, $2, $3)`,
        [user.id, hashToken(token), expiresAt],
    );

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
    });

    return true;
}

export async function signOut() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (token) {
        await query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
    }
    cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<User | null> {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const result = await query<User>(
        `SELECT u.id, u.email
         FROM sessions s
         INNER JOIN users u ON u.id = s.user_id
         INNER JOIN admin_users a ON a.user_id = u.id
         WHERE s.token_hash = $1 AND s.expires_at > now()
         LIMIT 1`,
        [hashToken(token)],
    );
    return result.rows[0] ?? null;
}

export async function requireAdmin() {
    const user = await getCurrentUser();
    if (!user) redirect("/admin/login");
    return user;
}
