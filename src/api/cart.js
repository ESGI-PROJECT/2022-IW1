import { createRequest } from "./api.js";

const request = createRequest();

export function getCart() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function setCartData(cart) {
    console.log(cart)
    return request.put("/cart/1", {
        id: cart.id,
        products: cart.products||[],
        total: cart.total||0
    })
    .catch(console.error);
}
  
