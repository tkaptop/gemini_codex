// Open-source version stub for the database layer.
// The original project used Postgres + Drizzle for auth, orders, credits, etc.
// For the public Gemini Studio content site, we disable database access.

export function db() {
  throw new Error("Database access is disabled in the open-source version.");
}
