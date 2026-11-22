CREATE TABLE IF NOT EXISTS chat_sessions (
  token TEXT PRIMARY KEY,
  account TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS chat_sessions_expires_idx ON chat_sessions (expires_at);

CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  account TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_account_idx ON chat_messages (account, id DESC);

CREATE TABLE IF NOT EXISTS chat_presence (
  account TEXT PRIMARY KEY,
  seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
