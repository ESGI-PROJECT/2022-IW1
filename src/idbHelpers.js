import { openDB } from 'idb';

export const PRODUCT_STORE_NAME = "Products";
export const CART_STORE_NAME = "Cart";

export function initDB() {
  return openDB("Nozama", 2, {
    upgrade(db) {
      const productStore = db.createObjectStore(PRODUCT_STORE_NAME, {
        keyPath: "id"
      });

      productStore.createIndex("id", "id");
      productStore.createIndex("category", "category");
      productStore.createIndex("price", "price");

      const cartStore = db.createObjectStore(CART_STORE_NAME);
      cartStore.createIndex("updated", "updated");
    }
  });
}

export async function setRessources(storeName, data = []) {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(storeName, "id");
}

export async function setRessource(storeName, data = {}, key) {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  if (key) {
    tx.store.put(data, key);
  } else {
    tx.store.put(data);
  }
  await tx.done;
  return key ? 
    db.get(storeName, key) :
    db.getFromIndex(storeName, "id", data.id);
}


export async function getRessources(storeName) {
  const db = await initDB();
  return db.getAllFromIndex(storeName, "id");
}

export async function getRessource(storeName, id, key) {
  const db = await initDB();
  if (key) {
    return db.get(storeName, key);
  }
  return db.getFromIndex(storeName, "id", id);
}

export async function unsetRessource(storeName, id) {
  const db = await initDB();
  await db.delete(storeName, id);
}