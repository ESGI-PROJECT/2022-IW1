import { createRequest } from "./api.js"

const request = createRequest();

/**get all carts */
export function getApiCartsProduct() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function getApiCartProduct(cartId) {
  return request.get(`/cart/${cartId}`)
    .then(({ data }) => data)
    .catch(console.error);
}

