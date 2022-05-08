import { openDB } from 'idb';

const STORE_NAME = "Products";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      const cart = db.createObjectStore("Cart", {
        keyPath: "id"
      });

    cart.createIndex("id", "id");
    cart.createIndex("category", "category");
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


export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function getRessourcesFromDB(table = STORE_NAME) {
  const db = await initDB();
  return db.getAllFromIndex(table, "id");
}


export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(STORE_NAME, "id", id);
}

export async function unsetRessource(id, table = STORE_NAME) {
  const db = await initDB();
  await db.delete(table, id);
}

export async function setData(data = [], table = STORE_NAME) {
  const db = await initDB();
  const tab = db.transaction(table, "readwrite");
  
  tab.store.put(data);
   
  
  await tab.done;
  return db.getAllFromIndex(table, "id");
}



export async function deleteItemCart(id)  {
  const db = await initDB();
  const request = db.transaction('Cart', 'readwrite')
            .objectStore('Cart')
            .delete(id);
  
}