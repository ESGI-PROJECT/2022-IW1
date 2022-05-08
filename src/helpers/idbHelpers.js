import { openDB } from 'idb';

import { CART_DB, STORE_DB } from '../constants/db_names';

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_DB, {
        keyPath: "id"
      });

      const cart = db.createObjectStore(CART_DB, {
        keyPath: "id"
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      cart.createIndex("id", "id");
    }
  });
}

export async function setRessources(data = [], store = STORE_DB ) {
  const db = await initDB();
  const tx = db.transaction(store, "readwrite");
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(store, "id");
}

export async function setRessource(data = {}, store = STORE_DB) {
  const db = await initDB();
  const tx = db.transaction(store, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(store, "id", data.id);
}


export async function getRessources(store = STORE_DB) {
  const db = await initDB();
  return db.getAllFromIndex(store, "id");
}

export async function getRessource(id, store = STORE_DB) {
  const db = await initDB();
  return db.getFromIndex(store, "id", id);
}

export async function unsetRessource(id, store = STORE_DB) {
  const db = await initDB();
  await db.delete(store, id);
}