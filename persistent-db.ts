require('dotenv').config();
import fsLeagcy from 'fs';
import fs from 'fs/promises';

export namespace PersistentDB {
  const dbpath = process.env.PERSISTENT_STORAGE_JSON_FILE || '';

  export async function createIfNotExist() {
    if (!fsLeagcy.existsSync(dbpath)) {
      await fs.writeFile(dbpath, '{}');
    }
    try {
      JSON.parse(await fs.readFile(dbpath, 'utf-8'));
    } catch {
      await fs.writeFile(dbpath, '{}');
    }
  }

  export async function getAll(): Promise<{[key: string]: string | number | boolean | undefined}> {
    const db = await fs.readFile(dbpath, 'utf-8');
    try {
      const objects: {[key: string]: string | number | boolean} = JSON.parse(db);
      return objects;
    } catch {
      return {};
    }
  }

  export async function get(key: string): Promise<string | number | boolean | undefined> {
    const db = await fs.readFile(dbpath, 'utf-8');
    try {
      const objects: {[key: string]: string | number | boolean} = JSON.parse(db);
      return objects[key];
    } catch {
      return undefined;
    }
  }

  export async function store(key: string, value: string | number | boolean) {
    const db = await fs.readFile(dbpath, 'utf-8');
    const objects: {[key: string]: string | number | boolean} = JSON.parse(db);
    objects[key] = value;
    await fs.writeFile(dbpath, JSON.stringify(objects));
  }

  export async function getAsNumber(key: string): Promise<number> {
    const value: string | number | boolean | undefined = await get(key);
    if (typeof value === 'number') {
      return value;
    }
    throw new Error(`key '${key}' value is not a number`);
  }

  export async function getAsBoolean(key: string): Promise<boolean> {
    const value: string | number | boolean | undefined = await get(key);
    if (typeof value === 'boolean') {
      return value;
    }
    throw new Error(`key '${key}' value is not a boolean`);
  }

  export async function getAsString(key: string): Promise<string> {
    const value: string | number | boolean | undefined = await get(key);
    if (typeof value === 'string') {
      return value;
    }
    throw new Error(`key '${key}' value is not a string`);
  }

  export async function storeNumber(key: string, value: any) {
    if (typeof value !== 'number') {
      throw new Error(`value ${value} is not a number`);
    }
    await store(key, value);
  }

  export async function storeString(key: string, value: any) {
    if (typeof value !== 'string') {
      throw new Error(`value ${value} is not a string`);
    }
    await store(key, value);
  }

  export async function storeBoolean(key: string, value: any) {
    if (typeof value !== 'boolean') {
      throw new Error(`value ${value} is not a boolean`);
    }
    await store(key, value);
  }
}
