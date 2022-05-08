import { openDB } from 'idb';

const STORE_NAME = "Products";
const CART_NAME = "Cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });
      const cart = db.createObjectStore(CART_NAME, {
        keyPath: "id"
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");
      cart.createIndex("id", "id");
      cart.createIndex("quantity", "quantity");
    }
  });
}

export async function setRessources(data = []) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function setRessource(data = {}) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(STORE_NAME, "id", data.id);
}
export async function initCart() {
  const db = await initDB();
  const tx = db.transaction(CART_NAME, "readwrite");
  tx.cart = {};
  await tx.done;
  return db.getFromIndex(CART_NAME, "id", data.id);
}

export async function setCart(data = {}) {
  const db = await initDB();
  const tx = db.transaction(CART_NAME, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getFromIndex(CART_NAME, "id", data.id);
}
export async function setQuantity(data = {}) {
  // TODO
}

export async function deleteCart(data = {}) {
  const db = await initDB();
  const tx = db.transaction(CART_NAME, "readwrite");
  tx.store.delete(data);
  await tx.done;
  return db.getAllFromIndex(CART_NAME, "id");
}

export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function getCart() {
  const db = await initDB();
  return db.getAllFromIndex(CART_NAME, "id");
}

export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(STORE_NAME, "id", id);
}
export async function getCartProduct(id) {
  const db = await initDB();
  return db.getFromIndex(CART_NAME, "id", id);
}

export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}