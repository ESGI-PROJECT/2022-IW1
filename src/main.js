import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct, getCart } from './api/products';
import "./views/app-home";
import { getRessource, getRessources, setRessource, setRessources, unsetRessource } from "./idbHelpers";

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    interval: 3000,
    threshold: 6000
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

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/cart', async () => {
    await import('./views/app-cart');

    let storedCart = {};
    if( NETWORK_STATE ) {
      const cart = await getCart();
      if( cart && ( typeof cart === "object" && Object.keys(cart).length !== 0) ){
        storedCart = await setRessource(cart, "Cart");
      } else {
        storedCart = await setRessource({
          id: 1,
          total: 0,
          products: [],
        },"Cart")
      }
    } else {
      storedCart = await getRessource(1, "Cart");
      console.log(storedCart);
      if( !storedCart ){
        storedCart = await setRessource({
          id: 1,
          total: 0,
          products: [],
        },"Cart")
      }
    }

    AppCart.items = storedCart.products;
    AppCart.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  })

  page();

})(document.querySelector('#app'));