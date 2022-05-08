import { createRequest } from "./api.js";

const request = createRequest();

export function updateCart(productid) {
  return request.put(`/carts/${productid}`)
    .then(({ data }) => data)
    .catch(console.error);
}

export function deleteFromCart(productid) {
  return request.delete(`/carts/${productid}`)
    .then(({ data }) => data)
    .catch(console.error);
}