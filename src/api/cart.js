import { createRequest } from "./api.js"

const request = createRequest();

export function postCart(item) {
    return request.post("/cart", item)
        .then(({ data }) => data)
        .catch(console.error);
}

export function getCart() {
    return request.get("/cart")
        .then(({ data }) => data)
        .catch(console.error);
}

