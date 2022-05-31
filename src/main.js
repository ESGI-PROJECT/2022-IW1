import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct } from './api/products';
import "./views/app-home";
import { getRessource, getRessources, setRessource, setRessources, CART_STORE_NAME, PRODUCT_STORE_NAME } from "./idbHelpers";
import { getCart } from "./api/cart";

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    interval: 3000
  });

  let NETWORK_STATE = true;

  document.addEventListener('connection-changed', ({ detail }) => {
    NETWORK_STATE = detail;
    if (NETWORK_STATE) {
      document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
    } else {
      document.documentElement.style.setProperty('--app-bg-color', '#717276');
    }
  });

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');
  const AppCart = main.querySelector('app-cart');

  page('*', async (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    let cartData;
    if (NETWORK_STATE) {
      cartData = await getCart();
    } else {
      cartData = {};
    }
    
    setRessource(CART_STORE_NAME, {
      items: [],
      total: 0,
      updated: 0,
      ...cartData,
    }, 'cart');
    
    next();
  });

  page('/', async () => {
    let storedproducts = []
    if (NETWORK_STATE) {
      const products = await getProducts();
      storedproducts = await setRessources(PRODUCT_STORE_NAME, products);
    } else {
      storedproducts = await getRessources(PRODUCT_STORE_NAME);
    }

    AppHome.products = storedproducts;
    AppHome.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/product/:id', async ({ params }) => {
    await import('./views/app-product');
    
    let storedProduct = {};
    if (NETWORK_STATE) {
      const product = await getProduct(params.id);
      storedProduct = await setRessource(PRODUCT_STORE_NAME, product);
    } else {
      storedProduct = await getRessource(PRODUCT_STORE_NAME, params.id);
    }

    AppProduct.product = storedProduct;
    AppProduct.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/cart', async () => {
    await import('./views/app-cart');

    const storedCart = await getRessource(CART_STORE_NAME, null, "cart");

    AppCart.cart = storedCart;
    AppCart.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page();

})(document.querySelector('#app'));