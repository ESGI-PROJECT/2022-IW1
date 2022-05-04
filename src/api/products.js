import { createRequest } from "./api.js";

const request = createRequest();

export function getProducts() {
  return request
    .get("/products")
    .then(({ data }) => data)
    .catch(console.error);
}

export function getProduct(productid) {
  return request
    .get(`/products/${productid}`)
    .then(({ data }) => data)
    .catch(console.error);
}

export function getCartProducts() {
  return request
    .get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function getCartProduct(id) {
  return request
    .get(`/cart/${id}`)
    .then(({ data }) => data)
    .catch(console.error);
}
