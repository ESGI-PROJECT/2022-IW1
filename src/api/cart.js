import { createRequest } from "./api.js";

const request = createRequest();

export function getCart() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function updateCart(newCart) {
  if( !newCart.products ){
    newCart.products = [];
  }
  if( !newCart.total || isNaN(newCart.total) || newCart.total < 0 ){
    newCart.total = 0;
  }
  return request.post("/cart", newCart)
    .then(({ data }) => data)
    .catch(console.error);
}

