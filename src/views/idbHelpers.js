import {openDb} from 'idb';

const STORE_NAME = "Products";
const STORE_CART = "Carts";

export function initDb() {
    return openDb("Nozama", 1, {
        upgrade(db) {
            store = db.createObjectStore(STORE_NAME, {
                keyPath: "id"
            });

            const storeCart = db.createObjectStore(STORE_CART, {
                keyPath: "id"
              });

            store.createIndex("id", "id");
            store.createIndex("category", "category");
            storeCart.createIndex("id", "id");
            storeCart.createIndex("product", "product");
        }
    });

}

export async function setRessources(data) {
    const db = initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    data.forEach(item => {
        tx.store.put(item);
    });
    await tx.done;
    return db.getAllFromIndex(STORE_NAME, "id");
}

export async function setRessourceCart(data) {
    const db = await initDB();
    const tx = db.transaction(STORE_CART, "readwrite");
    await tx.store.put(data);
    return db.getFromIndex(STORE_CART, "id", data.id);
}

export async function unsetRessourceCart(id) {
    const db = await initDB();
    await db.delete(STORE_CART, id);
}