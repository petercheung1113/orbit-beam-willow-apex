//#region node_modules/.nitro/vite/services/ssr/assets/db-BsiyhNta.js
var _0002_class_default = "CREATE TABLE IF NOT EXISTS practice_sessions (\n  id TEXT PRIMARY KEY,\n  student_id TEXT NOT NULL,\n  student_name TEXT NOT NULL,\n  mode TEXT NOT NULL,\n  finished_at TIMESTAMPTZ NOT NULL DEFAULT now(),\n  total INTEGER NOT NULL,\n  correct INTEGER NOT NULL,\n  seconds INTEGER NOT NULL,\n  topics TEXT NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS practice_sessions_student_idx\n  ON practice_sessions (student_id, finished_at DESC);\n\nCREATE TABLE IF NOT EXISTS tutor_messages (\n  id TEXT PRIMARY KEY,\n  student_id TEXT NOT NULL,\n  student_name TEXT NOT NULL,\n  topic TEXT NOT NULL DEFAULT '',\n  mode TEXT NOT NULL,\n  question TEXT NOT NULL,\n  reply TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE INDEX IF NOT EXISTS tutor_messages_student_idx\n  ON tutor_messages (student_id, created_at DESC);\n\nCREATE TABLE IF NOT EXISTS teacher_pin (\n  id INTEGER PRIMARY KEY CHECK (id = 1),\n  pin_hash TEXT NOT NULL\n);\n";
var _0003_chat_default = "CREATE TABLE IF NOT EXISTS chat_sessions (\n  token TEXT PRIMARY KEY,\n  account TEXT NOT NULL,\n  expires_at TIMESTAMPTZ NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS chat_sessions_expires_idx ON chat_sessions (expires_at);\n\nCREATE TABLE IF NOT EXISTS chat_messages (\n  id SERIAL PRIMARY KEY,\n  account TEXT NOT NULL,\n  body TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE INDEX IF NOT EXISTS chat_messages_account_idx ON chat_messages (account, id DESC);\n\nCREATE TABLE IF NOT EXISTS chat_presence (\n  account TEXT PRIMARY KEY,\n  seen_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n";
var _0004_avatars_default = "CREATE TABLE IF NOT EXISTS chat_avatars (\n  account TEXT PRIMARY KEY,\n  kind TEXT NOT NULL,\n  value TEXT NOT NULL,\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n";
var _0005_rooms_default = "CREATE TABLE IF NOT EXISTS chat_profiles (\n  account TEXT PRIMARY KEY,\n  display_name TEXT NOT NULL,\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS chat_rooms (\n  id TEXT PRIMARY KEY,\n  kind TEXT NOT NULL,\n  title TEXT NOT NULL,\n  created_by TEXT NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS chat_members (\n  room_id TEXT NOT NULL,\n  account TEXT NOT NULL,\n  PRIMARY KEY (room_id, account)\n);\n\nALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS room_id TEXT NOT NULL DEFAULT 'hall';\n\nCREATE INDEX IF NOT EXISTS chat_messages_room_idx ON chat_messages (room_id, id);\n";
var _0006_files_default = "ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS file_id TEXT;\nALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS file_name TEXT;\nALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS file_mime TEXT;\nALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS file_size BIGINT;\n";
var _0007_tug_default = "CREATE TABLE IF NOT EXISTS tug_rooms (\n  id TEXT PRIMARY KEY,\n  host TEXT NOT NULL,\n  mode TEXT NOT NULL,\n  minutes INTEGER NOT NULL,\n  topics TEXT NOT NULL,\n  seed INTEGER NOT NULL,\n  started_at TIMESTAMPTZ,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS tug_seats (\n  room_id TEXT NOT NULL,\n  account TEXT NOT NULL,\n  side TEXT NOT NULL,\n  slot INTEGER NOT NULL,\n  name TEXT NOT NULL,\n  joined BOOLEAN NOT NULL DEFAULT false,\n  PRIMARY KEY (room_id, account)\n);\n\nCREATE TABLE IF NOT EXISTS tug_answers (\n  room_id TEXT NOT NULL,\n  side TEXT NOT NULL,\n  slot INTEGER NOT NULL,\n  qi INTEGER NOT NULL,\n  correct BOOLEAN NOT NULL,\n  at TIMESTAMPTZ NOT NULL DEFAULT now(),\n  PRIMARY KEY (room_id, side, slot, qi)\n);\n";
var _0008_breakdown_default = "ALTER TABLE practice_sessions ADD COLUMN IF NOT EXISTS breakdown TEXT NOT NULL DEFAULT '';\n";
var _0009_file_store_default = "CREATE TABLE IF NOT EXISTS chat_uploads (\n  id TEXT PRIMARY KEY,\n  account TEXT NOT NULL,\n  room_id TEXT NOT NULL,\n  name TEXT NOT NULL,\n  mime TEXT NOT NULL,\n  size BIGINT NOT NULL,\n  received BIGINT NOT NULL DEFAULT 0,\n  next_idx INTEGER NOT NULL DEFAULT 0,\n  published TEXT\n);\n\nCREATE TABLE IF NOT EXISTS chat_file_parts (\n  id TEXT NOT NULL,\n  idx INTEGER NOT NULL,\n  bytes BYTEA NOT NULL,\n  PRIMARY KEY (id, idx)\n);\n";
var _0010_passwords_default = "CREATE TABLE IF NOT EXISTS class_passwords (\n  account TEXT PRIMARY KEY,\n  salt TEXT NOT NULL,\n  hash TEXT NOT NULL,\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n";
var _0011_live_default = "CREATE TABLE IF NOT EXISTS live_games (\n  id TEXT PRIMARY KEY,\n  host TEXT NOT NULL,\n  topics TEXT NOT NULL,\n  qcount INTEGER NOT NULL,\n  seconds INTEGER NOT NULL,\n  seed INTEGER NOT NULL,\n  phase TEXT NOT NULL,\n  qi INTEGER NOT NULL DEFAULT 0,\n  question_ms BIGINT,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS live_players (\n  game_id TEXT NOT NULL,\n  account TEXT NOT NULL,\n  name TEXT NOT NULL,\n  score INTEGER NOT NULL DEFAULT 0,\n  PRIMARY KEY (game_id, account)\n);\n\nCREATE TABLE IF NOT EXISTS live_answers (\n  game_id TEXT NOT NULL,\n  account TEXT NOT NULL,\n  qi INTEGER NOT NULL,\n  choice INTEGER NOT NULL,\n  correct BOOLEAN NOT NULL,\n  points INTEGER NOT NULL,\n  PRIMARY KEY (game_id, account, qi)\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_class.sql": _0002_class_default,
			"/migrations/0003_chat.sql": _0003_chat_default,
			"/migrations/0004_avatars.sql": _0004_avatars_default,
			"/migrations/0005_rooms.sql": _0005_rooms_default,
			"/migrations/0006_files.sql": _0006_files_default,
			"/migrations/0007_tug.sql": _0007_tug_default,
			"/migrations/0008_breakdown.sql": _0008_breakdown_default,
			"/migrations/0009_file_store.sql": _0009_file_store_default,
			"/migrations/0010_passwords.sql": _0010_passwords_default,
			"/migrations/0011_live.sql": _0011_live_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql` (class, chat, avatars, rooms, files, tug, breakdown, file store), auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as t };
