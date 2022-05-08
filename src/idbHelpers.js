import { openDB } from "idb";

const STORE_NAME = "Products";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      const cart = db.createObjectStore("Cart", {
        keyPath: "id",
      });

      cart.createIndex("id", "id");
    },
  });
}

export async function addToCart(data = {}) {
  const db = await initDB();
  const tx = db.transaction("Cart", "readwrite");
  const store = tx.objectStore("Cart");

  const item = await store.get(data.id);

  console.log("item", item);

  if (item) {
    await store.put({
      ...item,
      amount: item.amount + 1,
    });
  } else {
    await store.put({
      ...data,
      amount: 1,
    });
  }

  return tx.complete;
}

export async function removeFromCart(data = {}) {
  const db = await initDB();
  const tx = db.transaction("Cart", "readwrite");
  const store = tx.objectStore("Cart");

  const { id } = data;

  const item = await store.get(id);

  if (item) {
    console.log("item-----------", item);
    if (item.amount > 1) {
      console.log("here");
      await store.put({
        ...item,
        amount: item.amount - 1,
      });
    } else {
      console.log("there");
      await store.delete(id);
    }
  }

  return tx.complete;
}

export async function removeAllFromCart(data = {}) {
  const db = initDB();
  const tx = db.transaction("Cart", "readwrite");
  const store = tx.objectStore("Cart");

  const { id } = data;

  const item = store.get(id);

  if (item) {
    store.delete(id);
  }

  return tx.complete;
}

export async function getIDBCart() {
  const db = await initDB();
  return db.getAll("Cart");
}

export async function setIDBCart(data = []) {
  const db = await initDB();
  const tx = db.transaction("Cart", "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex("Cart", "id");
}

export async function setRessources(data = []) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  data.forEach((item) => {
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

export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(STORE_NAME, "id", id);
}

export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
