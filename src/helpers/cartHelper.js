import { CART_DB } from "../constants/db_names";
import { setRessource, setRessources, getRessources, getRessource, unsetRessource,  } from "./idbHelpers";
import { getCart, updateCart } from '../api/cart';

export async function isInCart(id){
    try{
        const NETWORK_STATE = window.navigator.onLine;
        let currentCart = {};
        if(NETWORK_STATE){
            currentCart = await getCart();
        }else{
            currentCart = await getRessources(CART_DB) || {};
        }
    
        if( !currentCart?.products || currentCart?.products.length < 1){ 
            throw new Error('No product in cart');
        }
        
        let isInCart = currentCart.products.find( prod => prod.id === id);
        if(isInCart) return true;
        throw new Error('Item not in cart');
    }catch(e){
        //console.log(e);
        return false;
    }
    
}

export async function addItemToCart({id, price}, quantity){
    const NETWORK_STATE = window.navigator.onLine;
    let currentCart = {};

    if(NETWORK_STATE){
        currentCart = await getCart();
    }else{
        currentCart = await getRessources(CART_DB) || {};
    }

    currentCart.products.push({id, quantity});
    currentCart.total = parseFloat(currentCart.total) + price;

    if(NETWORK_STATE){
        await updateCart(currentCart);
    }else{
        await setRessource(currentCart, CART_DB);
    }

}

export async function removeItemFromCart(id){
    const NETWORK_STATE = window.navigator.onLine;
    if(NETWORK_STATE){

    }
}
