import { getRessources, setCart } from "./idbHelpers";
import { getCart, setCartData } from "./api/cart";
function calculTotalCart(products) {
    let total = 0;
    products.forEach((element)=>{
        total+= element.price * element.quantity;
    })
    return Math.round(total);
}

export async function addToCart(product) {
    const [cart] = await getRessources('Cart');
    if(!cart||cart.length < 1){
      // init du cart avec le total
      product.quantity = 1;
      const total = product.price;
      await setCartData({id: 1, products: [product],total: total});
      return await setCart({id: 1, products: [product],total: total}, 'Cart');
    }else{
      // cart exist ({products: [], total: int})
      const result = cart.products.find((element)=>{
        return element.id===product.id;
      })
      if(result){
        const index = cart.products.indexOf(result);
        cart.products[index].quantity += 1;
      }else{
        product.quantity = 1;
        cart.products = [...cart.products,product];
      }
      
      cart.total = calculTotalCart(cart.products);
      await setCartData(cart);
      return await setCart(cart, 'Cart')
    }
}

export async function removeOne(product) {
    const [cart] = await getRessources('Cart');
   
    const result =  cart.products.findIndex(element=>element.id===product.id);
    if (result !== -1) {
        cart.products[result].quantity -= 1;
        cart.total = calculTotalCart(cart.products);

        await setCartData(cart);
        return await setCart(cart, 'Cart')
    }
    return null;
    
}

export async function removeProduct(product) {
    let [cart] = await getRessources('Cart');
    const result =  cart.products.findIndex(element=>element.id===product.id);
    if (result !== -1) {
        cart.products.splice(result, 1);
        cart.total = calculTotalCart(cart.products);
        
        await setCartData(cart);
        return await setCart(cart, 'Cart')
    }
    return null
}