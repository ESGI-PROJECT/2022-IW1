import { createRequest } from "./api.js";
import page from "page";
import {getIdbCart, setCart} from "../idbHelpers";

const request = createRequest();

export function getCart() {
    return request.get("/cart")
        .then(({ data }) => data)
        .catch(console.error);
}

export async function addProductToCart(product, quantity, action) {

    const cart = {
        id: 'cart',
        items: [],
        total: 0
    }

    const oldData = await getIdbCart('cart');
    if (oldData.items && oldData.items.length >= 1){
        if (oldData.items.some(item => item.id === product.id))
        {
            oldData.items.forEach((item, index) => {
                if (item.id === product.id)
                {
                    if (action === 'add'){
                        item.quantity += quantity;
                    }
                    else if (action === 'change'){
                        item.quantity = quantity;
                    }
                }
            });
            cart.items.push(oldData.items);
        }
        else {
            product['quantity'] = quantity;
            cart.items.push(oldData.items);
            cart.items.push(product);
        }
    }
    else {
        product['quantity'] = quantity;
        cart.items.push(product);
    }

    cart.items = cart.items.flat(Infinity);

    cart.items.forEach((item, index) => {
        cart.total += item.price * item.quantity;
    });

    await setCart(cart);

    request.put(`/cart`, cart)
        .then(({data}) => data)
        .catch(console.error);

    page('/cart');
}

export async function deleteProductFromCard(product){
    let cart = {
        id: 'cart',
        items: [],
        total: 0
    }

    const oldData = await getIdbCart('cart');

    if (oldData.items && oldData.items.length >= 1){
        cart = {
            ...cart,
            ...oldData
        }
    }

    cart.items = cart.items.flat(Infinity);

    cart.items.forEach((item, index) => {
        if (item.id === product.id)
        {
            cart.items.splice(index,1);
            cart.total -= item.price * item.quantity;
        }
    });

    if (cart.items.length === 0){
        cart.total = 0;
    }

    await setCart(cart);

    request.put(`/cart`, cart)
        .then(({data}) => data)
        .catch(console.error);

    window.location.reload();
}