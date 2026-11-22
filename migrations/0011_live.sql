CREATE TABLE IF NOT EXISTS live_games (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  topics TEXT NOT NULL,
  qcount INTEGER NOT NULL,
  seconds INTEGER NOT NULL,
  seed INTEGER NOT NULL,
  phase TEXT NOT NULL,
  qi INTEGER NOT NULL DEFAULT 0,
  question_ms BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS live_players (
  game_id TEXT NOT NULL,
  account TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (game_id, account)
);

CREATE TABLE IF NOT EXISTS live_answers (
  game_id TEXT NOT NULL,
  account TEXT NOT NULL,
  qi INTEGER NOT NULL,
  choice INTEGER NOT NULL,
  correct BOOLEAN NOT NULL,
  points INTEGER NOT NULL,
  PRIMARY KEY (game_id, account, qi)
);
