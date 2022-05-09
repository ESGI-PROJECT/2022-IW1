import { openDB } from 'idb';

export function initDB(storeName = "Products") {
  return openDB("Nozama", 2, {
    upgrade(database) {
      const store = database.createObjectStore(storeName, {
        keyPath: "id"
      });
      
      store.createIndex("id", "id");
      store.createIndex("category", "category");
    }
  });
}

export async function setRessources(data = [], storeName = "Products") {
  const database = await initDB(storeName);
  const transaction = database.transaction(storeName, "readwrite");
  data.forEach(item => {
    transaction.store.put(item);
  });
  await transaction.done;
  return database.getAllFromIndex(storeName, "id");
}

export async function setRessource(data = {}, storeName = "Products") {
  const database = await initDB(storeName);
  const transaction = database.transaction(storeName, "readwrite");
  transaction.store.put(data);
  await transaction.done;
  return database.getFromIndex(storeName, "id", data.id);
}


export async function getRessources(storeName = "Products") {
  const database = await initDB(storeName);
  return database.getAllFromIndex(storeName, "id");
}

export async function getRessource(id, storeName = "Products") {
  const database = await initDB(storeName);
  return database.getFromIndex(storeName, "id", id);
}

export async function unsetRessource(id, storeName = "Products") {
  const database = await initDB(storeName);
  await database.delete(storeName, id);
}