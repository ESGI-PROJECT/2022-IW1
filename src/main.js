import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct } from './api/products';
import "./views/app-home";
import { getRessource, getRessources, setRessource, setRessources, getCart } from "./idbHelpers";
import { getQuantities } from './views/app-cart';

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    interval: 3000,
    threshold: 2000
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

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    next();
  });

  page('/', async () => {
    let storedproducts = []
    if (NETWORK_STATE) {
      const products = await getProducts();
      storedproducts = await setRessources(products);
    } else {
      storedproducts = await getRessources();
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
      storedProduct = await setRessource(product);
    } else {
      storedProduct = await getRessource(params.id);
    }

    AppProduct.product = storedProduct;
    AppProduct.active = true;
    console.log(AppProduct.product);

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/cart', async () => {
    await import('./views/app-cart');
    const carts = await getCart();

    AppCart.cart = carts;
    AppCart.active = true;
    AppCart.quantities = getQuantities();
    
    console.log(AppCart.quantities);

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page();

})(document.querySelector('#app'));