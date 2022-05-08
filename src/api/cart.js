import { createRequest } from "./api.js";

const request = createRequest();

export function getCart() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function updateCart(newCart) {
  return request.post("/cart", newCart)
    .then(({ data }) => data)
    .catch(console.error);
}

