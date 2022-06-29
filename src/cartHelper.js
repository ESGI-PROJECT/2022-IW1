import { updateCart } from "./api/cart";
import { getCart, setCart } from "./idbHelpers";

let NETWORK_STATE = true;

let INSTALL_EVENT;

const nbInCart = document.querySelector(".cartCount");
const dialog = document.querySelector("dialog");

const isAppInstalled = window.matchMedia("(display-mode: standalone)").matches;

dialog.querySelector("button").addEventListener("click", async () => {
  INSTALL_EVENT.prompt();

  const { outcome } = await INSTALL_EVENT.userChoice;

  localStorage.setItem("dialogShown", "true");

  dialog.open = false;
});

document.addEventListener("connection-changed", async ({ detail: state }) => {
  NETWORK_STATE = state;
  const storedCart = await getCart();
  nbInCart.innerHTML = cumputeCartQuantity(storedCart);
  if (NETWORK_STATE && storedCart && storedCart.updated) {
    updateCart(storedCart);
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  INSTALL_EVENT = event;
});

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const _updateCart = debounce(updateCart);

export async function addToCart(product) {
  const storedCart = await getCart();

  const idx = storedCart.items.findIndex((item) => item.id == product.id);
  if (idx > -1) {
    storedCart.items[idx].quantity += 1;
  } else {
    storedCart.items.push({
      ...product,
      quantity: 1,
    });
  }

  storedCart.total = computeCartTotal(storedCart);

  let updatedCart = { ...storedCart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCart.updated = 0;
    updateCart(updatedCart);
  }

  await setCart(updatedCart);

  if (!isAppInstalled && localStorage.getItem("dialogShown") != "true") {
    setTimeout(() => (dialog.open = true), 2000);
  }
}

function computeCartTotal(cart) {
  nbInCart.innerHTML = cumputeCartQuantity(cart);
  return cart.items.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );
}

function cumputeCartQuantity(cart) {
  if (!cart) return 0;
  return cart.items.reduce((total, { quantity }) => total + quantity, 0);
}

export async function updateCartQuantity(product) {
  const cart = await getCart();

  const idx = cart.items.findIndex((item) => item.id === product.id);
  if (idx > -1) {
    cart.items[idx] = {
      ...cart.items[idx],
      quantity: product.quantity,
    };
  }

  cart.total = computeCartTotal(cart);

  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    await _updateCart(updatedCard);
  }

  return await setCart(updatedCard);
}

export async function deleteFromCart(product) {
  const cart = await getCart();

  cart.items = cart.items.filter((item) => item.id !== product.id);

  cart.total = computeCartTotal(cart);

  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    _updateCart(updatedCard);
  }

  return await setCart(updatedCard);
}
