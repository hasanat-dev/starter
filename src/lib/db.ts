/**
 * D1 database helpers.
 *
 * Access the D1 binding in API routes and pages:
 *   const db = getDB(Astro.locals);
 */

/** Get the D1 database binding from Astro locals */
export function getDB(locals: App.Locals): D1Database {
  return locals.runtime.env.DB;
}

/** Execute a query and return all rows */
export async function queryAll<T = Record<string, unknown>>(
  db: D1Database,
  sql: string,
  ...params: unknown[]
): Promise<T[]> {
  const stmt = db.prepare(sql);
  const { results } = await (params.length ? stmt.bind(...params) : stmt).all();
  return results as T[];
}

/** Execute a query and return the first row */
export async function queryOne<T = Record<string, unknown>>(
  db: D1Database,
  sql: string,
  ...params: unknown[]
): Promise<T | null> {
  const stmt = db.prepare(sql);
  const row = await (params.length ? stmt.bind(...params) : stmt).first();
  return (row as T) || null;
}

/** Execute a write query (INSERT, UPDATE, DELETE) */
export async function execute(
  db: D1Database,
  sql: string,
  ...params: unknown[]
): Promise<D1Result> {
  const stmt = db.prepare(sql);
  return params.length ? stmt.bind(...params).run() : stmt.run();
}
