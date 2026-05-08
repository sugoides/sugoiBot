import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const db = new Database(path.join(dataDir, 'database.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  
  CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS xp (
    userId TEXT PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS warnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    guildId TEXT,
    reason TEXT,
    moderatorId TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS currency (
    userId TEXT PRIMARY KEY,
    balance INTEGER DEFAULT 0,
    lastDaily INTEGER DEFAULT 0,
    lastWork INTEGER DEFAULT 0
  );
`);

export default db;
