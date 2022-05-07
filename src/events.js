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

    cart.total = parseFloat(cart.total) + parseFloat(product.price);
    cart = await setRessource(cart, "Cart");
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

    cart.products.map((item) => {
        if(item.product.id === product.id){
            if(item.number < 2){
                deleteAll(e);
            } else {
                item.number--;
            }
        }
    })
    
    cart.total = parseFloat(cart.total) - parseFloat(product.price);
    cart = await setRessource(cart, "Cart");

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

    cart.total = parseFloat(cart.total) - parseFloat(product.price) * parseFloat(cart.products[productIndex].number);
    cart.products.splice(productIndex, 1);
    cart = await setRessource(cart, "Cart");

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
    cart.total = parseFloat(cart.total) + parseFloat(product.price);
    cart = await setRessource(cart, "Cart");

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