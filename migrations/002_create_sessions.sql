CREATE TABLE sessions (
id TEXT PRIMARY KEY,
user_id INT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
created_at TIMESTAPTZ NOT NULL,
expires_at TIMESTAMPTS NOT NULL DEFAULT NOW()

)
CREATE INDEX indx_sessions_user_id ON sessions(user_id)