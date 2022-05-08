import { createRequest } from "./api.js";

const request = createRequest();

export function setCartItems(data = []) {
  return request
    .post(`/cart/`, data)
    .then((response) => console.log(response))
    .catch(console.error);
}

// export function setCartItem(data = []) {
//   return request
//     .post(`/cart/`, { data })
//     .then((response) => console.log(response))
//     .catch(console.error);
// }
