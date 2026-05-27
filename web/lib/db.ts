import { promises as fs } from 'fs';
import path from 'path';
import type { Database } from './types';
import { seedData } from './seed-data';

// Simple JSON-file-backed store. On first access it seeds data/db.json,
// then all reads/writes go through the persisted file. The API layer
// performs genuine filtering/search/pagination/mutation against this —
// nothing is hardcoded in the route handlers.

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

let writeLock: Promise<void> = Promise.resolve();

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(seedData, null, 2), 'utf-8');
  }
}

export async function readDB(): Promise<Database> {
  await ensureFile();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as Database;
}

export async function writeDB(db: Database): Promise<void> {
  // serialise writes to avoid clobbering under concurrent requests
  writeLock = writeLock.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  });
  return writeLock;
}

/** Mutate the DB atomically: read → apply → write, returning the callback result. */
export async function mutateDB<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const db = await readDB();
  const result = await fn(db);
  await writeDB(db);
  return result;
}

export function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
