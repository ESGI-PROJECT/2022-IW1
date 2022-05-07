import { getRessource, getRessources, setRessource } from "./idbHelpers";

export default async function addProduct(e){
    e.preventDefault();
    let product = await getRessource(parseInt(e.target.id), "Cart");
    let number = product === undefined ? 1 : product.number + 1;
    
    await setRessource({
        id: parseInt(e.target.id),
        number,
    }, "Cart");
    let storedCart = await getRessources("Cart");

    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            ...storedCart
        })
    })
    .then( res => res.json())
    .then( newCart => {
        console.log(newCart)
    })
    .catch( err => console.error(err))

}