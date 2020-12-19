import { openDB } from "idb";
import { Note } from "../models/Notes";

const store = {
  name: "notes",
  version: 1,
  table: "list",
};

const dbPromise = openDB(store.name, store.version, {
  upgrade(db) {
    db.createObjectStore(store.table);
  },
});

const StorageService = {
  async get(key: string) {
    return (await dbPromise).get(store.table, key);
  },
  async set(key: string, val: Note) {
    return (await dbPromise).put(store.table, val, key);
  },
  async delete(key: string) {
    return (await dbPromise).delete(store.table, key);
  },
  async clear() {
    return (await dbPromise).clear(store.table);
  },
  async keys() {
    return (await dbPromise).getAllKeys(store.table);
  },
  async getAll() {
    return (await dbPromise).getAll(store.table);
  },
  async add(key: string, value: Note) {
    return (await dbPromise).add(store.table, value, key);
  },
};

export default StorageService;
