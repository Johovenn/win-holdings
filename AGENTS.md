# AGENTS.md

This file provides repository-specific guidance for coding agents working on WIN Holdings.

## Project overview

- Next.js 16 App Router application using React 19 and TypeScript in strict mode.
- Tailwind CSS 4 is loaded from `app/globals.css`.
- `next-intl` provides English (`en`) and Chinese (`zh`) localized routes.
- Supabase provides authentication and application data for the admin area, news, careers, and applicants.
- Use the `@/*` path alias for imports rooted at the repository root.

## Repository map

- `app/[locale]/(site)/`: localized public pages.
- `app/(auth)/admin/`: admin authentication routes.
- `app/(admin)/admin/`: authenticated admin pages and server actions.
- `app/components/`: shared UI, layout, news, and career components.
- `i18n/`: locale routing and request configuration.
- `messages/`: translation catalogs; keep `en.json` and `zh.json` structurally aligned.
- `lib/db.ts` and `lib/auth.ts`: server-only PostgreSQL access and sessions.
- `lib/site.ts`: shared site data and navigation definitions.
- `public/images/`: static site imagery.

## Working conventions

- Prefer Server Components. Add `"use client"` only when browser APIs, state, effects, or event handlers require it.
- Keep mutations in server actions marked with `"use server"`. Authenticate and authorize admin mutations on the server before accessing data.
- Treat route `params` and other request APIs as asynchronous where required by this Next.js version.
- Use navigation helpers from `@/i18n/routing` for localized public navigation. Admin routes are not locale-prefixed.
- When adding or changing public copy, update both translation catalogs. Do not hard-code localized UI text in components unless the content is intentionally language-independent.
- Reuse components in `app/components/ui` and the existing Tailwind design patterns before introducing new abstractions or CSS.
- Use `next/image` for content images when practical and keep local assets under `public/`.
- Never expose Supabase service-role credentials or other secrets to Client Components. Only `NEXT_PUBLIC_*` values may be used in browser code.
- Preserve existing route-group boundaries and do not move routes merely for organization; route groups affect layout composition.
- Keep changes focused. Do not modify generated files such as `next-env.d.ts`, `.next/**`, or lockfiles unless dependency changes require it.

## Validation

Run the checks relevant to the change before handing off:

```bash
npm run lint
npm run build
```

- At minimum, run `npm run lint` for code changes.
- Run `npm run build` for routing, configuration, server/client boundary, data-fetching, or dependency changes.
- Test both `/en/...` and `/zh/...` when changing localized public pages.
- Test signed-out, non-admin, and authorized-admin behavior when changing authentication or admin actions.
- Do not claim a check passed unless it was actually run; report any skipped or failing checks.

## Environment and data safety

- Expected Supabase settings live in `.env.local`; never commit or print their values.
- Do not perform destructive database operations, alter production data, or change external Supabase configuration without explicit user approval.
- Preserve database error handling and cache revalidation when editing mutations.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
