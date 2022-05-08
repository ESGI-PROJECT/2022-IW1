import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct, getProductsCart } from './api/products';
import "./views/app-home";
import { getRessourcesFromDB, getRessource, getRessources, setRessource, setRessources } from "./idbHelpers";
import { AppCart } from "./views/app-cart";



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

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/cart', async () => {
    await import('./views/app-cart');

    let storedProducts = [];
    console.log(NETWORK_STATE);
      if (NETWORK_STATE) {
      // const product = await getProductsCart();
      // storedProducts = await setRessources(product, 'Cart');
      } else {
        storedProducts = await getRessourcesFromDB('Cart');
      }
      
      AppCart.products = storedProducts
      AppCart.active = true
      skeleton.setAttribute('hidden', 'hiddle');
  })

  page();

})(document.querySelector('#app'));