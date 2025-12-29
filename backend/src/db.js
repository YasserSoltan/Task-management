const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// For Vercel: use /tmp directory (writable) or local database.sqlite for development
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel 
  ? path.join('/tmp', 'database.sqlite')
  : path.join(__dirname, '..', 'database.sqlite');

if (isVercel && !fs.existsSync('/tmp')) {
  fs.mkdirSync('/tmp', { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('pending','in_progress','done')) DEFAULT 'pending',
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;
