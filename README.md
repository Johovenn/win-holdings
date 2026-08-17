# WIN Holdings

WIN Holdings is a Next.js application with PostgreSQL-backed public content and
admin authentication. It can run as a standalone Docker Compose deployment on
Linux; it does not require Vercel or Supabase.

## Container deployment

The top-level [compose.yaml](compose.yaml) starts the Next.js app and a single
PostgreSQL service. The schema is initialized from
[win-holdings-migration.sql](win-holdings-migration.sql).

### First-time server setup

1. Install Docker Engine with Docker Compose v2 on the Linux server.
2. Copy `.env.example` to `.env` and set strong values for
   `POSTGRES_PASSWORD` and `DATABASE_URL`.
3. Import existing content data before cutover if the current Supabase project
   already contains news, careers, or applications.
4. Configure a reverse proxy (for example, Caddy or Nginx) with TLS and route
   the application domain to `app:3000`. Do not expose PostgreSQL publicly.
5. Start and verify the deployment:

   ```bash
   docker compose up -d --build
   docker compose ps
   ```

The PostgreSQL data is stored in the `postgres_data` Docker volume. Back it up
before upgrades or destructive Compose commands.

## Local application development

For Windows/macOS development, use the normal Node.js workflow rather than the
production container:

```bash
npm run dev
```

Run `npm run lint` before committing application changes. The container uses a
multi-stage Node 22 Alpine build and Next.js standalone output for a compact,
non-root Linux runtime image.
