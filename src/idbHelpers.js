import { openDB } from 'idb';

const STORE_NAME = "Products";
const STORE_NAME_CART = "cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      const storeCart = db.createObjectStore(STORE_NAME_CART, {
        keyPath: "id"
      });
      storeCart.createIndex("id", "id");

    }
  });
}

export async function setRessources(data = [], store = STORE_NAME) {
  const db = await initDB();
  const tx = db.transaction(store, "readwrite");
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(store, "id");
}

export async function setRessource(data = {}, store = STORE_NAME) {
  const db = await initDB();
  const tx = db.transaction(store, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(store, "id", data.id);
}


export async function getRessources(store = STORE_NAME) {
  const db = await initDB();
  return db.getAllFromIndex(store, "id");
}

export async function getRessource(id, store = STORE_NAME) {
  const db = await initDB();
  return db.getFromIndex(store, "id", id);
}

export async function unsetRessource(id, store = STORE_NAME) {
  const db = await initDB();
  await db.delete(store, id);
}