# WIN Holdings

WIN Holdings is a Next.js application with Supabase-backed public content and
admin authentication. It can run as a standalone Docker container on Linux; it
does not require Vercel.

## Container deployment

The top-level [compose.yaml](compose.yaml) starts the Next.js app and includes
the official Supabase self-hosted Docker Compose stack. The stack is deliberately
bootstrapped from the official Supabase repository instead of maintaining a
partial, incompatible copy of its Auth/API/Database services here.

### First-time server setup

1. Install Docker Engine with Docker Compose v2 on the Linux server.
2. Clone this repository, then fetch a **pinned Supabase release tag**:

   ```bash
   sh ./scripts/bootstrap-supabase.sh <supabase-release-tag>
   ```

3. Configure `supabase/.env` from the upstream template. Before the first start,
   generate unique database, JWT, API, dashboard, and encryption secrets; set
   `SITE_URL`, `API_EXTERNAL_URL`, and `SUPABASE_PUBLIC_URL` to your production
   HTTPS domains. Do not retain upstream example credentials.
4. Copy `.env.example` to `.env`. Set `NEXT_PUBLIC_SUPABASE_URL` to the same
   public API URL and set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the
   corresponding Supabase key (`ANON_KEY` for the legacy default configuration).
5. Import the existing Supabase database schema and required data into the local
   database. This repository currently has no SQL migrations, so this must be
   exported from the existing project before cutover.
6. Configure a reverse proxy (for example, Caddy or Nginx) with TLS: route the
   application domain to `app:3000` and the Supabase API domain to
   `kong:8000`. Do not expose database, Studio, or service ports to the public
   internet.
7. Start and verify the deployment:

   ```bash
   docker compose up -d --build
   docker compose ps
   ```

`NEXT_PUBLIC_*` variables are compiled into the browser bundle, so changing the
Supabase URL or publishable key requires `docker compose up -d --build`.

The Supabase Compose files and `.env` are ignored by Git. Persistent database
and storage volumes are managed by Supabase's official Compose configuration;
back them up before upgrades or destructive Compose commands.

## Local application development

For Windows/macOS development, use the normal Node.js workflow rather than the
production container:

```bash
npm run dev
```

Run `npm run lint` before committing application changes. The container uses a
multi-stage Node 22 Alpine build and Next.js standalone output for a compact,
non-root Linux runtime image.
