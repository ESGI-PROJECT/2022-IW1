import { setCart } from "./api/cart";
import { CART_STORE_NAME, getRessource, setRessource } from "./idbHelpers";

let NETWORK_STATE = true;

document.addEventListener('connection-changed', async ({ detail }) => {
  NETWORK_STATE = detail;

  const cartToSync = await getRessource(CART_STORE_NAME, null, 'cart');
  if (NETWORK_STATE && cartToSync.updated) {
    const updatedCart = { ...cartToSync, updated: 0 };
    await setRessource(CART_STORE_NAME, updatedCart, 'cart');
    await setCart(updatedCart);
  }
});

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const _setCart = debounce(setCart);

export async function addToCart(product) {
  const cart = await getRessource(CART_STORE_NAME, null, 'cart');

  if (!cart.items.map(i => i.id).includes(product.id)) {
    cart.items.push({
      ...product,
      quantity: 1
    });
  } else {
    const idx = cart.items.findIndex(item => item.id === product.id);
    if (idx > -1) {
      cart.items[idx] = {
        ...cart.items[idx],
        quantity: cart.items[idx].quantity + 1
      };
    }
  }

  cart.total = getCartTotal(cart);

  
  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    await setCart(updatedCard);
  }

  await setRessource(CART_STORE_NAME, updatedCard, 'cart');
}

export async function updateCartQuantity(product) {
  const cart = await getRessource(CART_STORE_NAME, null, 'cart');

  const idx = cart.items.findIndex(item => item.id === product.id);
  if (idx > -1) {
    cart.items[idx] = {
      ...cart.items[idx],
      quantity: product.quantity
    };
  }

  cart.total = getCartTotal(cart);
 
  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    await _setCart(updatedCard);
  }

  return await setRessource(CART_STORE_NAME, updatedCard, 'cart');
}

export async function deleteFromCart(product) {
  const cart = await getRessource(CART_STORE_NAME, null, 'cart');

  cart.items = cart.items.filter(item => item.id !== product.id);

  cart.total = getCartTotal(cart);

  let updatedCard = { ...cart, updated: 1 };
  
  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    _setCart(updatedCard);
  }

  return await setRessource(CART_STORE_NAME, updatedCard, 'cart');
}

function getCartTotal(cart) {
  return cart.items.reduce((a, b) => a + (b.price * b.quantity), 0);
}
