import { getRessource, setRessource } from "./idbHelpers";

export async function addOne(e){
    e.preventDefault();

    let product = await getRessource(parseInt(e.target.id));
    let cart = await getRessource(1, "Cart");
    console.log(cart);

    cart.products.map((item) => {
        if(item.product.id === product.id){
            item.number++;
        }
    })

    cart.total = cart.total + product.price;
    await setRessource(cart, "Cart");
    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(cart)
    })
    .then( res => res.json())
    .then(() => window.location.reload())
    .catch( err => console.error(err))
}

export async function deleteOne(e){
    e.preventDefault();

    let product = await getRessource(parseInt(e.target.id));
    let cart = await getRessource(1, "Cart");
    let productIndex = null;

    const isEmpty = cart.products.reduce((acc, item, index) => {
        if(item.product.id === product.id){
            productIndex = index;
            if(item.number < 2){
                return true;
            }
        }
        return acc;
    }, false)
    if(isEmpty){
        deleteAll(e);
        return;
    }
    cart.products[productIndex].number--;
    
    cart.total = cart.total - product.price;
    await setRessource(cart, "Cart");

    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(cart)
    })
    .then( res => res.json())
    .then( () => window.location.reload())
    .catch( err => console.error(err))
}

export async function deleteAll (e) {
    e.preventDefault();

    let product = await getRessource(parseInt(e.target.id));
    let cart = await getRessource(1, "Cart");
    let productIndex = null;

    cart.products.map((item, index) => {
        if(item.product.id === product.id){
            productIndex = index;
        }
    })
    if(cart.products.length ===  1){
        cart.total = 0;
        cart.products.pop();
    } else {
        cart.total = cart.total - (product.price * cart.products[productIndex].number);
        cart.products.splice(productIndex, 1);
    }
    await setRessource(cart, "Cart");

    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(cart)
    })
    .then( res => res.json())
    .then( () => window.location.reload())
    .catch( err => console.error(err))
}

export async function addProduct(e){
    e.preventDefault();

    let product = await getRessource(parseInt(e.target.id));
    let cart = await getRessource(1, "Cart");
    if( !cart || ( typeof cart === "object" && Object.keys(cart).length === 0) ){
        cart = {
            id: 1,
            total: 0,
            products: [],
        };
    }
    const isInArray = cart.products.reduce((acc, item) => {
        if(item.product.id === product.id){
            item.number++;
            return true;
        }
        return acc;
    }, false)
    if(!isInArray){
        cart.products = [
            ...cart.products,
            {
                product,
                number: 1
            },
        ]
    } 
    cart.total = cart.total + product.price;
    await setRessource(cart, "Cart");

    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(cart)
    })
    .then( res => res.json())
    .catch( err => console.error(err))
}