# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with content collections
- `pnpm build` - Build the application and content collections
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter (use for code quality checks)
- `pnpm format` - Format code with Biome

### Database Operations (Drizzle ORM)
- `pnpm db:generate` - Generate new migration files based on schema changes
- `pnpm db:migrate` - Apply pending migrations to the database
- `pnpm db:push` - Sync schema changes directly to the database (development only)
- `pnpm db:studio` - Open Drizzle Studio for database inspection and management

### Content and Email
- `pnpm content` - Process MDX content collections
- `pnpm email` - Start email template development server on port 3333

## Project Architecture

This is a Next.js full-stack SaaS application with the following key architectural components:

### Core Stack
- **Framework**: Next.js with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with social providers (Google, GitHub)
- **Payments**: Stripe integration with subscription and one-time payments
- **UI**: Radix UI components with TailwindCSS
- **State Management**: Zustand for client-side state
- **Internationalization**: next-intl with English and Chinese locales
- **Content**: Fumadocs for documentation and MDX for content
- **Code Quality**: Biome for formatting and linting

### Key Directory Structure
- `src/app/` - Next.js app router with internationalized routing
- `src/components/` - Reusable React components organized by feature
- `src/lib/` - Utility functions and shared code
- `src/db/` - Database schema and migrations
- `src/actions/` - Server actions for API operations
- `src/stores/` - Zustand state management
- `src/hooks/` - Custom React hooks
- `src/config/` - Application configuration files
- `src/i18n/` - Internationalization setup
- `src/mail/` - Email templates and mail functionality
- `src/payment/` - Stripe payment integration
- `src/credits/` - Credit system implementation
- `content/` - MDX content files for docs and blog
- `messages/` - Translation files (en.json, zh.json) for internationalization

### Authentication & User Management
- Uses Better Auth with PostgreSQL adapter
- Supports email/password and social login (Google, GitHub)
- Includes user management, email verification, and password reset
- Admin plugin for user management and banning
- Automatic newsletter subscription on user creation

### Payment System
- Stripe integration for subscriptions and one-time payments
- Three pricing tiers: Free, Pro (monthly/yearly), and Lifetime
- Credit system with packages for pay-per-use features
- Customer portal for subscription management

### Feature Modules
- **Blog**: MDX-based blog with pagination and categories
- **Docs**: Fumadocs-powered documentation
- **AI Features**: Image generation with multiple providers (OpenAI, Replicate, etc.)
- **Newsletter**: Email subscription system
- **Analytics**: Multiple analytics providers support
- **Storage**: S3 integration for file uploads

### Development Workflow
1. Use TypeScript for all new code
2. Follow Biome formatting rules (single quotes, trailing commas)
3. Write server actions in `src/actions/`
4. Use Zustand for client-side state management
5. Implement database changes through Drizzle migrations
6. Use Radix UI components for consistent UI
7. Follow the established directory structure
8. Use proper error handling with error.tsx and not-found.tsx
9. Leverage Next.js features like Server Actions
10. Use `next-safe-action` for secure form submissions

### Configuration
- Main config in `src/config/website.tsx`
- Environment variables template in `env.example`
- Database config in `drizzle.config.ts`
- Biome config in `biome.json` with specific ignore patterns
- TypeScript config with path aliases (@/* for src/*)

### Testing and Quality
- Use Biome for linting and formatting
- TypeScript for type safety
- Environment variables for configuration
- Proper error boundaries and not-found pages
- Zod for runtime validation

## Important Notes

- The project uses pnpm as the package manager
- Database schema is in `src/db/schema.ts` with auth, payment, and credit tables
- Email templates are in `src/mail/templates/`
- The app supports both light and dark themes
- Content is managed through MDX files in the `content/` directory
- The project includes comprehensive internationalization support

## SEO Strategy

### Reference Materials
- SEO strategy guides are located at `/Users/mystery/Desktop/SEO/*.md`
- Key files: `init.md` (keyword strategy), `养网站防老_完整教程.md` (site building tutorial), `知识库_外链变现运营.md` (backlinks & monetization), `找词体系.md` (keyword research system)

### Deployment
- Deploy to Cloudflare Pages (not Vercel)
- Production domain: `journalprompts.org`
- Use `pnpm deploy` for Cloudflare deployment

### SEO Architecture
- 14 topic landing pages targeting long-tail keywords (e.g., "gratitude journal prompts", "shadow work journal prompts")
- Each landing page follows a 7-section structure: SceneHero → PromptFinder → WhySection → FeaturedPrompts → HowToUse → FAQ(Schema) → RelatedScenes
- FAQ Schema markup on every page for rich snippets
- Blog enabled for content marketing and Adsense qualification

### Key SEO Targets
- Primary keyword: "journal prompts" (27,100 monthly searches)
- 767 related keywords, total search volume 114,450, average KD 16%
- Scene pages target specific long-tail keywords with low difficulty

### SEO Safety Rules (MUST follow)
- **NEVER change the 14 scene page URL slugs** — they are indexed by Google. Changing them loses all SEO value.
  - The slugs are defined in `src/data/scenes.ts` and referenced in `src/routes.ts`, navbar, footer, sitemap, and blog MDX files.
- **NEVER remove** the `robots.txt`, `sitemap.xml`, or their generation logic
- **NEVER remove** the Google verification meta tag in `src/app/[locale]/layout.tsx`
- **NEVER remove** FAQ Schema (`application/ld+json`) from scene pages
- Adding new pages, changing styles/content/interactions, and improving performance are all safe and encouraged
- When adding new scene pages, add them to: `scenes.ts`, `routes.ts`, `sitemap.ts`, navbar config, and footer config

### Deployment Commands
- Build: `pnpm build`
- OpenNext build: `npx opennextjs-cloudflare build`
- Deploy: `npx wrangler deploy`
- Full sequence: `pnpm build && npx opennextjs-cloudflare build && npx wrangler deploy`

### Active Integrations
- **Google Search Console**: Verified via HTML tag (meta tag in layout.tsx)
- **Google Analytics**: G-ZVLDJ2JYBM (via `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` env var)
- **Google OAuth**: Enabled (Google Cloud project yomo-6340e, client configured in .env.local)
- **Neon PostgreSQL**: Free tier, schema pushed via `pnpm db:push`
- **Cloudflare Workers**: Custom domains journalprompts.org + www.journalprompts.org
- **Cloudflare Secrets**: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DATABASE_URL, BETTER_AUTH_SECRET, NEXT_PUBLIC_BASE_URL

## Working Style

- **优先用浏览器自动化完成外部平台操作**（Stripe、Google Console 等），只有登录认证或真正卡住时才叫用户
- 需要用户操作时，给出**最精简的步骤**，一次只要求一件事
- 每完成一个里程碑就汇报进度
