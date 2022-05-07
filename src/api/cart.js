import axios from "redaxios";
import { getRessource, setRessource } from "../idbHelpers";

export function getSomething(url) {
  return fetch(url, {
    method: "GET",
    credentials: "same-origin",
  }).then((response) => response.json());
}

export async function addQuantité(e) {
  e.preventDefault();
  let product = await getRessource(parseInt(e.target.value));
  let cart = await getRessource("1", "cart");

  cart.products.map((item) => {
    if (item.product.id == product.id) {
      item.number = parseInt(item.number) + 1;
    }
  });

  cart.total = parseFloat(cart.total) + parseFloat(product.price);

  await setRessource(cart, "cart");

  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());

  window.location.reload();
}

export async function deleteQuantité(e) {
  e.preventDefault();
  let product = await getRessource(parseInt(e.target.value));
  let cart = await getRessource("1", "cart");
  let reset = false;
  cart.products.map((item) => {
    if (item.product.id == product.id) {
      if (item.number < 2) {
        deleteFromCart(e);
        reset = true;
      }
      item.number = parseInt(item.number) - 1;
    }
  });

  if(reset){
    window.location.reload();
    return
  }
  cart.total = parseFloat(cart.total) - parseFloat(product.price);

  await setRessource(cart, "cart");

  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());
  window.location.reload();
}

export async function deleteFromCart(e) {
  e.preventDefault();
  let product = await getRessource(parseInt(e.target.value));
  let cart = await getRessource("1", "cart");
  let deleteIndex;

  cart.products.map((item,index) => {
    if (item.product.id == product.id) {
      deleteIndex = index;
    }
  });
  cart.total = parseFloat(cart.total) - (parseFloat(cart.products[deleteIndex].product.price) * parseFloat(cart.products[deleteIndex].number));
  cart.products.splice(deleteIndex,1);

  await setRessource(cart, "cart");

  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());
  window.location.reload();
}

export async function addToCart(e) {
  e.preventDefault();
  let product = await getRessource(parseInt(e.target.value));
  let cart = await getRessource("1", "cart");
  let incremented = false;

  if (!cart || (typeof cart === "object" && Object.keys(cart).length == 0)) {
    cart = {
      id: "1",
      total: "0.00",
      products: [],
    };
  }

  cart.products.map((item) => {
    if (item.product.id == product.id) {
      item.number = parseInt(item.number) + 1;
      incremented = true;
    }
  });

  if (!incremented) {
    cart.products.push({ product, number: 1 });
  }
  cart.total = parseFloat(cart.total) + parseFloat(product.price);

  await setRessource(cart, "cart");

  fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(cart),
  }).then((response) => response.json());
}
