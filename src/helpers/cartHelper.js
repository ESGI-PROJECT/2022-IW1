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
            currentCart = await getRessource(1, CART_DB) || {};
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

export async function addItemToCart({id, price}, quantity=1){
    const NETWORK_STATE = window.navigator.onLine;
    let currentCart = {};

    if(NETWORK_STATE){
        currentCart = await getCart();
    }else{
        currentCart = await getRessource(1, CART_DB) || {};
    }

    currentCart.products.push({id, quantity});
    currentCart.total = parseFloat(currentCart.total || 0) + (price * quantity);;
    
    if(NETWORK_STATE){
        await updateCart(currentCart);
    }

    await setRessource({id: 1, ...currentCart}, CART_DB);

}

export async function removeItemFromCart(id){
    try{
        const NETWORK_STATE = window.navigator.onLine;
        let currentCart = {};
        let concernedProduct = {};
        let fullProd = await getRessource(id);

        if(!fullProd) throw new Error('Could not find the original product');

        if(NETWORK_STATE){
            currentCart = await getCart();
        }else{
            currentCart = await getRessource(1, CART_DB) || {};
        }

        concernedProduct = currentCart.products.find(prod => prod.id === id);
        if( !concernedProduct ){
            throw new Error('Product not in cart');
        }

        console.log(currentCart.total + ' - ' + fullProd.price);
        currentCart.total = parseFloat(currentCart.total) - fullProd.price;
        currentCart.products = currentCart.products.filter( prod => prod.id !== id);

        if(NETWORK_STATE){
            await updateCart(currentCart);
        }
        await setRessource({id:1, ...currentCart}, CART_DB);
        
    }catch(e){
        console.error(e.message);
    }
    
}

export async function sendLocalCart(){
    const currentCart = await getRessource(1, CART_DB) || { total: 0, products: []};
    await updateCart(currentCart);
}

export async function editProduct(id, flag){
    try{
        if( !['inc', 'dec'].includes(flag) ) throw new Error('Wrong flag');

        const currentCart = await getRessource(1, CART_DB);
        if(!currentCart) return;

        if( currentCart.products.length < 1) throw new Error('No product');

        let product = currentCart.products.find( prod => prod.id === id);
        if(!product) throw new Error('Product not in cart');;

        let fullProd = await getRessource(product.id);
        if(!fullProd) throw new Error('Could not find the original product');

        switch(flag){
            case 'inc':
                product.quantity = product.quantity + 1;
                currentCart.total = parseFloat(currentCart.total) + parseFloat(fullProd.price);
                currentCart.total = currentCart.total.toFixed(2);
                break;
            case 'dec':
                product.quantity = product.quantity - 1;
                if(product.quantity <= 0){
                    await removeItemFromCart(id);
                    return;
                }else{
                    currentCart.total = parseFloat(currentCart.total) - parseFloat(fullProd.price);
                    currentCart.total = currentCart.total.toFixed(2);
                }
                break;
    
        }
        const NETWORK_STATE = window.navigator.onLine;
        if(NETWORK_STATE){
            await updateCart(currentCart);
        }
        await setRessource({id:1, ...currentCart}, CART_DB);
    }catch(e){
        console.error(e.message);
    }
    
}