import page from "page";
import checkConnectivity from "network-latency";

import { getProducts, getProduct } from "./api/products";
import { setCartItems } from "./api/cart";
import { NETWORK_STATE, setNetworkState } from "./networkState";
import "./views/app-home";
import {
  getRessource,
  getRessources,
  setRessource,
  setRessources,
} from "./idbHelpers";
(async (root) => {
  const skeleton = root.querySelector(".skeleton");
  const main = root.querySelector("main");

  checkConnectivity({
    interval: 3000,
    threshold: 2000,
  });

  // let NETWORK_STATE = true;
  let cartUptoDate = false;

  document.addEventListener("connection-changed", async ({ detail }) => {
    setNetworkState(detail);
    if (NETWORK_STATE) {
      if (cartUptoDate === false) {
        const storedCartItems = await getRessources("Cart");
        await setCartItems(storedCartItems);
        cartUptoDate = true;
        console.log("updated");
      }
      document.documentElement.style.setProperty("--app-bg-color", "royalblue");
    } else {
      document.documentElement.style.setProperty("--app-bg-color", "#717276");
      cartUptoDate = false;
    }
  });

  const AppHome = main.querySelector("app-home");
  const AppProduct = main.querySelector("app-product");
  const AppCart = main.querySelector("app-cart");

  page("*", (ctx, next) => {
    skeleton.removeAttribute("hidden");

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    next();
  });

  page("/", async () => {
    let storedproducts = [];
    if (NETWORK_STATE) {
      const products = await getProducts();
      storedproducts = await setRessources(products);
    } else {
      storedproducts = await getRessources();
    }

    AppHome.products = storedproducts;
    AppHome.active = true;

    skeleton.setAttribute("hidden", "hiddle");
  });

  page("/product/:id", async ({ params }) => {
    await import("./views/app-product");

    let storedProduct = {};
    if (NETWORK_STATE) {
      const product = await getProduct(params.id);
      storedProduct = await setRessource(product);
    } else {
      storedProduct = await getRessource(params.id);
    }

    AppProduct.product = storedProduct;
    AppProduct.active = true;

    skeleton.setAttribute("hidden", "hiddle");
  });

  page("/cart", async () => {
    await import("./views/app-cart");

    let storedCartItems = [];
    // if (NETWORK_STATE) {
    //   const products = await getProducts();
    //   storedCartItems = await setRessources(products);
    // } else {
    //   storedCartItems = await getRessources();
    // }
    storedCartItems = await getRessources("Cart");
    AppCart.products = storedCartItems;
    AppCart.active = true;
    skeleton.setAttribute("hidden", "hiddle");
  });

  page();
})(document.querySelector("#app"));
