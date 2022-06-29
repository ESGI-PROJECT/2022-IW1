import page from "page";
import checkConnectivity from "network-latency";

import { getProducts, getProduct } from "./api/products";
import "./views/app-home";
import {
  getCart,
  getRessource,
  getRessources,
  setCart,
  setRessource,
  setRessources,
} from "./idbHelpers";
import { fetchCart } from "./api/cart";
import { authChanged, getUser } from "./firebase";

(async (root) => {
  const skeleton = root.querySelector(".skeleton");
  const main = root.querySelector("main");

  checkConnectivity({
    interval: 3000,
    threshold: 2000,
  });

  let NETWORK_STATE = true;

  document.addEventListener("connection-changed", ({ detail }) => {
    NETWORK_STATE = detail;
    if (NETWORK_STATE) {
      document.documentElement.style.setProperty("--app-bg-color", "royalblue");
    } else {
      document.documentElement.style.setProperty("--app-bg-color", "#717276");
    }
  });

  const AppHome = main.querySelector("app-home");
  const AppProduct = main.querySelector("app-product");
  const AppCart = main.querySelector("app-cart");
  const AppLogin = main.querySelector("app-login");

  let isLogged = getUser();

  authChanged((user) => {
    isLogged = user;
    page("/");
  });

  page("*", async (ctx, next) => {
    skeleton.removeAttribute("hidden");

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    skeleton.setAttribute("hidden", "hiddle");

    let cart = {};

    if (NETWORK_STATE) {
      cart = await fetchCart();
    }

    setCart({
      items: [],
      total: 0,
      updated: 0,
      ...cart,
    });

    if (!isLogged && ctx.path != "/login") {
      page("/login");
    }

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

  page("/cart", async (ctx) => {
    await import("./views/app-cart");

    const storedCart = await getCart();

    AppCart.active = true;
    AppCart.cart = storedCart;

    skeleton.setAttribute("hidden", "hiddle");
  });
  page("/login", async (ctx) => {
    await import("./views/app-login");

    AppLogin.active = true;

    skeleton.setAttribute("hidden", "hiddle");
  });

  page();
})(document.querySelector("#app"));
