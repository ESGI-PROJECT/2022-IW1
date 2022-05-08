import { openDB } from "idb";
import { NETWORK_STATE } from "./networkState";
import { setCartItems } from "./api/cart";

const STORE_NAME = "Products";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore("Products", {
        keyPath: "id",
      });

      const store2 = db.createObjectStore("Cart", {
        keyPath: "id",
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      store2.createIndex("id", "id");
      store2.createIndex("product", "product");
    },
  });
}

export async function setRessources(data = [], storeName = "Products") {
  if (storeName == "Cart" && NETWORK_STATE) {
    await setCartItems(data);
  }
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(storeName, "id");
}

export async function setRessource(data = {}, storeName = "Products") {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  tx.store.put(data);
  await tx.done;

  // synchronize with database
  if (storeName == "Cart" && NETWORK_STATE) {
    const storedCartItems = await getRessources("Cart");
    await setCartItems(storedCartItems);
  }
  return db.getFromIndex(storeName, "id", data.id);
}

export async function getRessources(storeName = "Products") {
  const db = await initDB();
  return db.getAllFromIndex(storeName, "id");
}

export async function getRessource(id, storeName = "Products") {
  const db = await initDB();
  return db.getFromIndex(storeName, "id", id);
}

export async function unsetRessource(id, storeName = "Products") {
  const db = await initDB();
  await db.delete(storeName, id);
}
