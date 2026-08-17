import { hash } from "@node-rs/argon2";
import pg from "pg";

const { Pool } = pg;
const [, , email, password] = process.argv;

if (!email || !password) {
    console.error("Usage: node scripts/create-admin.mjs <email> <password>");
    process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
    const result = await pool.query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
         RETURNING id`,
        [email.trim().toLowerCase(), await hash(password)],
    );

    await pool.query(
        `INSERT INTO admin_users (user_id) VALUES ($1)
         ON CONFLICT (user_id) DO NOTHING`,
        [result.rows[0].id],
    );

    console.log(`Admin user ready: ${email.trim().toLowerCase()}`);
} finally {
    await pool.end();
}
