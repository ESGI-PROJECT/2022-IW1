/**import */
import { html } from 'lit';
import { Base } from '../Base';
import { setApiCart } from '../api/cart';
import "../components/product-card";
import "../../assets/css/product.css"
export class CartHome extends Base {
  constructor() {
    super();
    this.storedCart = {};
    this.loaded = false;
  }
  static get properties() {
    return {
      storedCart: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  load() {
    this.loaded = true;
  }

  deleteCart() {
    let id = {products: [], total: 0};
    this.storedCart = id;
    setApiCart(id);
  }

  render() {
    return html`
          ${this.storedCart.products && this.storedCart.products.map(product => html`
            <div class="card">
              <header>
                <figure>
                  <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${product.image})"></div>
                  <img
                    alt="${product.title}"
                    src="http://localhost:9000/image/620/${product.image}"
                    loading="lazy"
                    width="1280" height="720"
                    @load="${this.load}">
                </figure>
              </header>
              <main>
                <h1>${product.title}</h1>
                <p>${product.description}</p>
                <p>${product.price} $</p>
              </main>
            </div>
          `)}
         
          <div class="total"> 
            <div class="box" ><button style="background-color:red; class="delete" @click="${this.deleteCart}">Delete</button></div>
            <div class="box" ><p>Total: ${this.storedCart.total} $</p></div>
          </div>
        `
  }
}
customElements.define('cart-product', CartHome);
