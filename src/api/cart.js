import { createRequest } from "./api";

const request = createRequest();

export function getCart() {
  return request
    .get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function syncCart(cart) {
  return request
    .post("/cart", cart)
    .then(({ data }) => data)
    .catch(console.error);
}
