CREATE TABLE IF NOT EXISTS chat_uploads (
  id TEXT PRIMARY KEY,
  account TEXT NOT NULL,
  room_id TEXT NOT NULL,
  name TEXT NOT NULL,
  mime TEXT NOT NULL,
  size BIGINT NOT NULL,
  received BIGINT NOT NULL DEFAULT 0,
  next_idx INTEGER NOT NULL DEFAULT 0,
  published TEXT
);

CREATE TABLE IF NOT EXISTS chat_file_parts (
  id TEXT NOT NULL,
  idx INTEGER NOT NULL,
  bytes BYTEA NOT NULL,
  PRIMARY KEY (id, idx)
);
