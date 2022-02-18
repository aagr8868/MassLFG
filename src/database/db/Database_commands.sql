
-- Table Creation
CREATE TABLE IF NOT EXISTS user_info(
  steamid VARCHAR(200),
  username VARCHAR(200) PRIMARY KEY,
  bio VARCHAR(200),
  password VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS games_info(
  steamid VARCHAR(200) PRIMARY KEY,
  gameid  VARCHAR(200)
);

-- Generic Data
INSERT INTO user_info(steamid, username, bio, password) VALUES('76561198060225512', 'RayJZ', 'I love pie.', 'Hats89$Hats');
INSERT INTO user_info(steamid, username, bio, password) VALUES('76561197960434622', 'JohnSmith', 'Just your average Joe.', '123CUbuffs123');