# Hasanat D1 Database Skill

## Overview

Use Cloudflare D1 (SQLite at the edge) as your app's database. D1 is free-tier friendly and requires zero separate infrastructure.

## Setup

### 1. Create a D1 Database

```bash
npx wrangler d1 create your-app-db
```

This outputs a database_id. Copy it.

### 2. Configure wrangler.toml

```toml
[[d1_databases]]
binding = "DB"
database_name = "your-app-db"
database_id = "paste-your-database-id-here"
```

### 3. Define Your Schema

Edit `schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT,
  description_ar TEXT,
  description_en TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'archived')),
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_items_created_by ON items(created_by);
```

### 4. Apply Migrations

```bash
# Local development
npm run db:migrate:local

# Production
npm run db:migrate:prod
```

## Using D1 in Code

### Basic Queries

```typescript
import { getDB, queryAll, queryOne, execute } from "@/lib/db";

// In a page or API route:
const db = getDB(Astro.locals);

// Select many
const items = await queryAll(db, "SELECT * FROM items WHERE status = ?", "active");

// Select one
const item = await queryOne(db, "SELECT * FROM items WHERE id = ?", id);

// Insert
await execute(db, "INSERT INTO items (title_ar, created_by) VALUES (?, ?)", title, userId);

// Update
await execute(db, "UPDATE items SET status = ? WHERE id = ?", "archived", id);

// Delete
await execute(db, "DELETE FROM items WHERE id = ?", id);
```

### In API Routes

```typescript
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const { results } = await db.prepare("SELECT * FROM items WHERE status = ?").bind("active").all();
  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const user = locals.user;
  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();
  await db.prepare("INSERT INTO items (title_ar, created_by) VALUES (?, ?)")
    .bind(body.title_ar, user.id)
    .run();

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
};
```

## Schema Best Practices

1. **Bilingual columns**: Use `_ar` and `_en` suffixes for translated fields
2. **Timestamps**: Use `TEXT` with `datetime('now')` for SQLite compatibility
3. **Status fields**: Use CHECK constraints for type safety
4. **User references**: Store `created_by` as TEXT (user IDs from auth.hasanat.dev)
5. **Indexes**: Add indexes on columns you filter/sort by frequently

## Security

- **Always use parameterized queries** — never interpolate user input into SQL
- **Validate input with zod** before writing to database
- **Check authentication** before write operations
- **Use row-level filtering** — only return data the user should see

```typescript
// GOOD — parameterized
await db.prepare("SELECT * FROM items WHERE id = ?").bind(id).all();

// BAD — SQL injection risk
await db.prepare(`SELECT * FROM items WHERE id = ${id}`).all();
```

## D1 Limits (Free Tier)

- 5M rows read per day
- 100K rows written per day
- 5GB storage
- 10 databases per account

These limits are generous for most Hasanat apps.
