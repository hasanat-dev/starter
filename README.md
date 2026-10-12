# Hasanat Starter 🌙

Build apps that serve the Ummah — hosted free on hasanat.dev.

## What You Get (Free)

- ☁️ **Hosting** — Cloudflare Pages (global CDN, zero cost)
- 🌐 **Subdomain** — yourapp.hasanat.dev
- 🔐 **Auth** — auth.hasanat.dev (Google, GitHub login)
- 🗄️ **Database** — Cloudflare D1 (SQLite at the edge)
- 📊 **Listing** — Your app in the Hasanat app gallery
- 🤖 **AI Tools** — Agent skills for AI-assisted development
- 👥 **Community** — Builders, testers, and feedback

## Quick Start

### 1. Create your project

Click **"Use this template"** on GitHub, then:

```bash
git clone https://github.com/YOUR_USERNAME/your-app.git
cd your-app
npm install
cp .env.example .env
```

### 2. Develop locally

```bash
npm run dev    # → http://localhost:4321
```

### 3. Set up D1 database (optional)

```bash
npx wrangler d1 create your-app-db
# Copy the database_id into wrangler.toml
npm run db:migrate:local
```

### 4. Request a subdomain and a listing

When it is ready for users, request what you need from the builder dashboard at **[platform.hasanat.dev/dashboard](https://platform.hasanat.dev/dashboard)**: a `yourapp.hasanat.dev` subdomain, a database, or a listing of your project on hasanat.dev. Guides for every step are on [platform.hasanat.dev](https://platform.hasanat.dev).

## How It Works

1. **You build** — Use this template or bring your own web app
2. **You request** — Ask for a subdomain, database or listing in the [builder dashboard](https://platform.hasanat.dev/dashboard)
3. **A maintainer sets it up** — Hasanat's maintainers handle requests from a written runbook
4. **You're live** — Your app runs at yourapp.hasanat.dev, and your project can take offers of help on [hasanat.dev](https://hasanat.dev)

## Stack

- **Framework**: [Astro 5](https://astro.build) (SSR) + [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Language**: TypeScript (strict)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite at the edge)
- **Auth**: [auth.hasanat.dev](https://auth.hasanat.dev) — Google & GitHub login
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)
- **i18n**: Arabic (RTL, default) + English

## Auth Integration

Pre-wired in `src/lib/auth.ts` + `src/middleware.ts`.

```typescript
// In any .astro page:
const user = Astro.locals.user;
// { id, name, email, image, role } or null
```

Sign-in link:
```typescript
import { getSignInUrl } from "@/lib/auth";
const signInUrl = getSignInUrl(Astro.url.href);
```

## Database

D1 binding available after setup:

```typescript
import { getDB, queryAll } from "@/lib/db";

const db = getDB(Astro.locals);
const items = await queryAll(db, "SELECT * FROM items WHERE status = ?", "active");
```

## Hosting Elsewhere?

Not on Cloudflare? Request a listing or a subdomain from the [builder dashboard](https://platform.hasanat.dev/dashboard) with your URL. Shared sign-in works through the `.hasanat.dev` cookie, so it needs your app on a `*.hasanat.dev` subdomain; there is no OAuth flow for other domains yet, so request sign-in support from the dashboard if you need it.

## Project Structure

```
├── src/
│   ├── middleware.ts      # Auth verification
│   ├── lib/
│   │   ├── auth.ts        # Auth helpers
│   │   └── db.ts          # D1 database helpers
│   ├── layouts/
│   │   └── Layout.astro   # Base HTML layout
│   ├── pages/
│   │   ├── ar/            # Arabic pages (RTL)
│   │   ├── en/            # English pages (LTR)
│   │   └── api/           # API routes
│   ├── i18n/              # Translations (ar.json, en.json)
│   ├── components/        # Astro & React components
│   └── styles/            # Global CSS + Tailwind
├── schema.sql             # D1 database schema
├── wrangler.toml          # Cloudflare config
└── .github/skills/        # AI agent skills
```

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Biome linter |
| `npm run check` | TypeScript + Astro checks |
| `npm run db:migrate:local` | Apply schema to local D1 |
| `npm run db:migrate:prod` | Apply schema to production D1 |

## License

MIT — build freely, serve generously.
