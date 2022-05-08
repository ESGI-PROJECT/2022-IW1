import { openDB } from 'idb';

const STORE_NAME = "Products";
const STORE_NAME_CART = "Cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });

      const store2 = db.createObjectStore(STORE_NAME_CART, {
        keyPath: "id"
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      store2.createIndex("id", "id");
    }
  });
}

export async function setCart(cart = {}) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME_CART, "readwrite");
  tx.store.put(cart);
  await tx.done;
  return db.getAllFromIndex(STORE_NAME_CART, "id");
}

export async function setRessources(data = [], storename = STORE_NAME) {
  const db = await initDB();
  const tx = db.transaction(storename, "readwrite");
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(storename, "id");
}

export async function setRessource(data = {}, storename = STORE_NAME) {
  const db = await initDB();
  const tx = db.transaction(storename, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(storename, "id", data.id);
}


export async function getRessources(storename = STORE_NAME) {
  const db = await initDB();
  return db.getAllFromIndex(storename, "id");
}

export async function getRessource(id, storename = STORE_NAME) {
  const db = await initDB();
  return db.getFromIndex(storename, "id", id);
}

export async function unsetRessource(id, storename = STORE_NAME) {
  const db = await initDB();
  await db.delete(storename, id);
}

export async function deleteItem(id, storename = STORE_NAME) {
  const db = await initDB();
  const tx = db.transaction(storename, "readwrite");
  tx.store.delete(id);
  await tx.done;
  return await getRessources(storename);
}