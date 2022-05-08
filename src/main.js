import page from "page";
import checkConnectivity from "network-latency";


import { getProducts, getProduct } from './api/products';

import "./views/app-home";
import "./views/app-cart";

import { getRessource, getRessources, setRessource, setRessources } from "./helpers/idbHelpers";
import { CART_DB } from "./constants/db_names";
import { getCart } from "./api/cart";
import { sendLocalCart } from "./helpers/cartHelper";

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    interval: 3000,
    threshold: 2000
  });

  let NETWORK_STATE = true;
  let CONNECTION_LOST = false; // Allows to know it the connection has been lost at one point and restored

  document.addEventListener('connection-changed', async ({ detail }) => {
    NETWORK_STATE = detail;
    if (NETWORK_STATE) {
      document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
      if(CONNECTION_LOST){
        await sendLocalCart();
        CONNECTION_LOST = false;
      }else{
        //Sending local cart to api if the connection is restored
        const cart = await getCart();
        await setRessource({id: 1, ...cart} , CART_DB);
      }
    } else {
      CONNECTION_LOST = true;
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
    let cart = {};
    cart = await getRessource(1, CART_DB);

    //Retrieving data from the products in cart
    if(cart.products.length > 0){
      let tmpProducts = cart.products.map( async (prod) => {
        return getRessource(prod.id);
      });
      let products = (await Promise.all(tmpProducts));

      cart.products = cart.products.map( itemInCart => {
        let prod = products.find( prod => itemInCart.id === prod.id);
        return {...itemInCart, ...prod}
      })
   }

    AppCart.cart = cart;
    AppCart.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page();

})(document.querySelector('#app'));