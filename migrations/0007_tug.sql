CREATE TABLE IF NOT EXISTS tug_rooms (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  mode TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  topics TEXT NOT NULL,
  seed INTEGER NOT NULL,
  started_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tug_seats (
  room_id TEXT NOT NULL,
  account TEXT NOT NULL,
  side TEXT NOT NULL,
  slot INTEGER NOT NULL,
  name TEXT NOT NULL,
  joined BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (room_id, account)
);

CREATE TABLE IF NOT EXISTS tug_answers (
  room_id TEXT NOT NULL,
  side TEXT NOT NULL,
  slot INTEGER NOT NULL,
  qi INTEGER NOT NULL,
  correct BOOLEAN NOT NULL,
  at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, side, slot, qi)
);
