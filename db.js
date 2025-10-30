import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}

export async function createTable() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS equipos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      liga TEXT,
      puntos INTEGER NOT NULL,
      goles_favor INTEGER NOT NULL,
      goles_contra INTEGER NOT NULL
    )
  `);
}
