import { openDB } from "idb";

const STORE_NAME = "Products";
const CART_NAME = "Cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
      });
      const cart = db.createObjectStore(CART_NAME, {
        keyPath: "id",
      });

      store.createIndex("id", "id");
      store.createIndex("category", "category");

      cart.createIndex("id", "id");

      setCart({ id: "cart", products: [], total: 0 });
    },
  });
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

export async function getCart() {
  const db = await initDB();
  return db.getFromIndex(CART_NAME, "id", "cart");
}

export async function setCart(data = {}) {
  const db = await initDB();
  const tx = db.transaction(CART_NAME, "readwrite");
  tx.store.put(data);
  await tx.done;
  return db.getAllFromIndex(CART_NAME, "id");
}

export async function getCartProduct(id) {
  const db = await initDB();
  const cart = await getCart();
  const product = cart.products.find((item) => item.id === id);
  return product;
}

export async function setCartProduct(product) {
  const db = await initDB();
  const cart = await getCart();
  const item = cart.products.find((item) => item.id === product.id);
  if (item) {
    item.quantity += product.quantity;
  } else {
    cart.products.push(product);
  }
  cart.total += product.price * product.quantity;
  await setCart(cart);
}

export async function updateCartProductQuantity(id, quantity) {
  const db = await initDB();
  const cart = await getCart();
  const item = cart.products.find((item) => item.id === id);
  if (item) {
    item.quantity = quantity;
    if ((quantity = 0)) {
      cart.products.splice(cart.products.indexOf(item), 1);
    }
    cart.total = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }
  await setCart(cart);
}

export async function deleteCartProduct(id) {
  const db = await initDB();
  const cart = await getCart();
  const item = cart.products.find((item) => item.id === id);
  if (item) {
    cart.products.splice(cart.products.indexOf(item), 1);
  }
  cart.total = cart.products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  await setCart(cart);
}

export async function getCartProducts() {
  const db = await initDB();
  const cart = await getCart();
  return cart.products;
}
