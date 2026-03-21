# Hasanat App Development

This project uses the [Hasanat Starter](https://github.com/hasanat-dev/starter) template.

## Rules

- Use `@/` path aliases for all imports
- Use Tailwind logical properties for RTL support (`ms-*`, `me-*`, `ps-*`, `pe-*`)
- Update both `src/i18n/ar.json` and `src/i18n/en.json` for all user-facing text
- Use Biome for formatting, not Prettier
- Use auth.hasanat.dev for authentication — do NOT add Firebase or other auth
- Use Cloudflare D1 for database — access via `Astro.locals.runtime.env.DB`
- Validate all input with zod
- Use `lucide-react` for icons

## Stack

- Astro 5 (SSR) + React 19
- Tailwind CSS v4
- TypeScript strict
- Cloudflare Pages + D1
- auth.hasanat.dev

## Quick Reference

```typescript
// Auth
const user = Astro.locals.user; // { id, name, email, image, role } | null

// Database
const db = Astro.locals.runtime.env.DB;
const { results } = await db.prepare("SELECT * FROM items").all();

// i18n
import { useTranslations } from "@/i18n/utils";
const t = useTranslations("ar");
t("key.name"); // returns translated string
```
