# Repository Guidelines

## Project Structure & Module Organization
Routes and server actions live in `src/app` (locale-aware pages in `[locale]`). Reusable UI sits in `src/components`—libraries like `ui/`, `magicui/`, `tailark/`, plus domain folders. Shared logic and AI workflows belong in `src/lib` and `src/ai`, while Drizzle schemas and migrations stay in `src/db`. Place transactional emails in `src/mail`, analytics providers in `src/analytics`, static assets in `public/`, operational scripts in `scripts/`, and marketing/docs content in `content/`.

## Build, Test, and Development Commands
Use the pinned `pnpm@10.26.1`. Install dependencies with `pnpm install` and run `pnpm dev` for the local Next.js server. Use `pnpm build` to produce the optimized bundle and `pnpm start` to serve it. `pnpm lint` runs Biome **with writes**; use `pnpm exec biome check <changed-files>` for a read-only check. Database work uses Drizzle and the existing Neon database; verify the target and authorization before migrations or `db:push`. The legacy `fix-payments` and `fix-payments-scene` scripts mutate payment records and are not routine maintenance or health checks.

## Coding Style & Naming Conventions
Biome (`biome.json`) enforces two-space indentation, single quotes, ES5 trailing commas, and required semicolons. Module filenames favour kebab-case (`dashboard-sidebar.tsx`), hooks use the `use-` prefix (`use-session.ts`), and utilities default to named exports. Tailwind utilities live in `src/styles`; extend tokens there instead of scattering magic values. Keep server-only code in files marked with `"use server"` and avoid pulling client hooks into those modules.

## Testing Guidelines
Run `pnpm test` (Vitest), `pnpm exec tsc --noEmit`, and the production build for application changes, followed by relevant auth, billing, AI, or journal checks. Tests are colocated as `.test.ts`. Production QA uses isolated synthetic accounts and exact object IDs; do not add fixtures to real customers or infer payment success from a temporary entitlement fixture. Keep existing unrelated lint findings separate from new changes.

## Production Deployment
The production branch is `main`; the site runs on Cloudflare Worker `ai-journal-prompts` at `https://journalprompts.org` and `https://www.journalprompts.org`, using OpenNext. GitHub push alone does not deploy this Worker. After a successful Next build, `pnpm exec opennextjs-cloudflare build --skipNextBuild` prepares the Worker. Inspect the exact upload with `pnpm exec wrangler deploy --dry-run --no-experimental-autoconfig --outdir <private-output-directory>`, then publish the approved artifact with `pnpm exec wrangler deploy --keep-vars --no-experimental-autoconfig`. Keep `keep_names: false` in `wrangler.jsonc`: next-themes serializes its inline script, which breaks when esbuild inserts name-preservation helpers. Verify the live build ID, sitemap production URLs, auth, and relevant behavior after deployment.

## Commit & Pull Request Guidelines
Follow the Conventional Commit style (`feat:`, `fix:`, `chore:`) observed in the log. Keep commits scoped, reference issue IDs in the body, and refresh `env.example` whenever environment variables change. PRs should include a concise summary, testing notes (commands + results), screenshots for UI updates, and callouts for docs or config changes. Request review once checks pass and highlight breaking changes early.

## Configuration & Secrets
Use `env.example` for local development. Store production credentials as Cloudflare Worker secrets, including the database, Better Auth, Stripe, Resend, and OpenRouter bindings. Never load recovered production environment files during a build: Next standalone output can copy environment files into artifacts. Production builds should receive the correct public site/price configuration and nonfunctional placeholders for required server-only build values; real server credentials are supplied at Worker runtime. Scan both the final bundled Worker and public assets for credentials and environment files before publishing. Never log database URLs, tokens, or keys, including in scheduled scripts.
