import { createRequest } from "./api.js";

const request = createRequest();

export async function getCart() {
  return await request
    .get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export async function getCartProducts() {
  return await request
    .get(`/cart`)
    .then(({ data }) => data.products)
    .catch(console.error);
}

export async function getCartProduct(id) {
  const cart = await getCart();
  const product = cart.products.find((item) => item.id === id);
  return product;
}

export async function addItemToCart(product) {
  const cart = await getCart();
  if (cart?.products.length) {
    const item = cart.products.find((item) => item.id === product.id);
    if (item) {
      item.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
  } else {
    cart.products = [product];
  }
  return await request
    .post(`/cart`, cart)
    .then(({ data }) => data)
    .catch(console.error);
}

export async function removeItemFromCart(product) {
  const cart = await getCart();
  cart.products = cart.products.filter((p) => p.id !== product.id);
  return await request
    .post(`/cart`, cart)
    .then(({ data }) => data)
    .catch(console.error);
}

export async function updateCartProductQuantity(id, quantity) {
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
  return await request
    .post(`/cart`, cart)
    .then(({ data }) => data)
    .catch(console.error);
}
