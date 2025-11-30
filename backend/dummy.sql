CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT,
  password TEXT,
  email TEXT
)



INSERT INTO users (id, username, password, email) VALUES (uuid_generate_v4(), 'victim1', 'victim1pass', 'victim1@pentest.com');
INSERT INTO users (id, username, password, email) VALUES (uuid_generate_v4(), 'victim2', 'victim2pass', 'victim2@pentest.com');
INSERT INTO users (id, username, password, email) VALUES (uuid_generate_v4(), 'admin', 'adminpass', 'admin@pentest.com');

-- Tabel data rahasia user untuk simulasi IDOR
CREATE TABLE user_secrets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  secret_data TEXT
);

-- Data dummy user_secrets

INSERT INTO user_secrets (user_id, secret_data) VALUES
  ((SELECT id FROM users WHERE username='victim1'), 'victim1 private key: 12345'),
  ((SELECT id FROM users WHERE username='victim2'), 'victim2 private key: 67890'),
  ((SELECT id FROM users WHERE username='admin'), 'admin master key: root-access');
