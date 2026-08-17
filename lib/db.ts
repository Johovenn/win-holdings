import "server-only";

import { Pool, type QueryResultRow } from "pg";

const globalForDb = globalThis as unknown as { postgresPool?: Pool };

export const db =
    globalForDb.postgresPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
    });

if (process.env.NODE_ENV !== "production") {
    globalForDb.postgresPool = db;
}

export function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values: unknown[] = [],
) {
    return db.query<T>(text, values);
}
