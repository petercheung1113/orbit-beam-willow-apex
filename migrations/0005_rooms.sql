CREATE TABLE IF NOT EXISTS chat_profiles (
  account TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_rooms (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_members (
  room_id TEXT NOT NULL,
  account TEXT NOT NULL,
  PRIMARY KEY (room_id, account)
);

ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS room_id TEXT NOT NULL DEFAULT 'hall';

CREATE INDEX IF NOT EXISTS chat_messages_room_idx ON chat_messages (room_id, id);
