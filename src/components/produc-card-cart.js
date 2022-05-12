import { html } from 'lit';
import { editProductQuantity, removeProductFromCart } from '../api/products';
import { Base } from '../Base';
import { getRessource, setRessource } from '../idbHelpers';

export class ProductCardCart extends Base {
  constructor() {
    super();

    this.product = {}; 
    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  render() {
    return html`
      <section class="card">
        <a href="/product/${this.product.id}" class="card">
            <header>
            <figure>
                <div class="placeholder ${this.loaded ? "fade": ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
                <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
            </figure>
            </header>
            <main>
            <h1>${this.product.title}</h1>
            <p>${this.product.description}</p>
            </main>
        </a>
        Quantity <input @change="${this.editQuantity}" type="number" value="${this.product.quantity}"</input>
        <button @click="${this.removeProductFromCart}">🗑️</button> 
      </section>
    `;
  }

  async removeProductFromCart() {
    const main = document.querySelector('main');
    const AppCart = main.querySelector("app-cart") ;
    if(AppCart.state) {

      const cart = await removeProductFromCart(this.product.id) ;  
      AppCart.products.items = cart.items ; 
      AppCart.products.total = cart.total ;  

      cart['id'] = 1 ; 
      cart['category'] = 'cart' ; 
      setRessource(cart, 'Cart') ; 

    } else {

      const cart = {total:0,items:[],id:1};
      const currentCart = await getRessource(1, 'Cart') ;

      for(const item of currentCart.items) {
        if(this.product.id != item.id) 
          cart.items.push(item) ;
      }
      cart.items = cart.items.flat(Infinity) ; 
      for(const item of cart.items) {
        cart.total += item.price * item.quantity ;
      }

      AppCart.products.items = cart.items ; 
      AppCart.products.total = cart.total ;
      await setRessource(cart, 'Cart') ;


    }

    AppCart.active = false ; 
    AppCart.active = true ;
  }


}
customElements.define('product-card-cart', ProductCardCart);