import { createRequest } from "./api.js";

const request = createRequest();

export async function fetchCart() {
  return request
    .get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export async function updateCart(cart) {
  return request
    .put("/cart", cart)
    .then(({ data }) => data)
    .catch(console.error);
}
