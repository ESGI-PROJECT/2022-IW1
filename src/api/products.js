import { createRequest } from "./api.js";

const request = createRequest();

export function getProducts() {
  return request.get("/products")
    .then(({ data }) => data)
    .catch(console.error);
}

export function getProduct(productid) {
  return request.get(`/products/${productid}`)
    .then(({ data }) => data)
    .catch(console.error);
}

export function getProductsCart() {
  return request.get('/cart')
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(console.error);
    
}

export async function addProductToCart(product) {
  const cart = await getProductsCart();
  const newCart = [...cart.filter(item => item.id !== product.id), product];
  return request.post(`/cart`, newCart)
    .then(({ data }) => data)
    .catch(console.error);
}
