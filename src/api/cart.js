import { createRequest } from "./api.js"

const request = createRequest();

/**get all carts */
export function getApiCarts() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function getApiCartProduct(cartId) {
  return request.get(`/cart/${cartId}`)
    .then(({ data }) => data)
    .catch(console.error);
}

export function setApiCart(cart) {
  return request.post("/cart", cart)
    .then(({ data }) => data)
    .catch(console.error);
}

