CREATE TABLE IF NOT EXISTS practice_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  mode TEXT NOT NULL,
  finished_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  total INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  seconds INTEGER NOT NULL,
  topics TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS practice_sessions_student_idx
  ON practice_sessions (student_id, finished_at DESC);

CREATE TABLE IF NOT EXISTS tutor_messages (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT '',
  mode TEXT NOT NULL,
  question TEXT NOT NULL,
  reply TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tutor_messages_student_idx
  ON tutor_messages (student_id, created_at DESC);

CREATE TABLE IF NOT EXISTS teacher_pin (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  pin_hash TEXT NOT NULL
);
