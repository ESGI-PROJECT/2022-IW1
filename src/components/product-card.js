import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { setApiCart, getApiCarts} from '../api/cart';

export class ProductCard extends Base {
  constructor() {
    super();
    this.product = {};
    this.loaded = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
    }
  }
  
  firstUpdated() {
    this.querySelector('img').addEventListener('load', () => {
      this.loaded = true;
      //console.log("firstUpdated")
    });
    
  }

  async _handleClickGet() {
    let cart = {products: [], total: 0};
    const storedCart = await getApiCartsProduct();
    console.log(storedCart);
    if (storedCart.products.length > 0) {
        storedCart.products.forEach(product => {
            cart.products.push(product);
            cart.total += product.price;
        });
    }
    cart.products.push(this.product);
    cart.total = cart.total + this.product.price;

    setApiCart(cart);
}


  render() {
    return html`
    <div id="homePageCart">
      <div>
        <button @click="${this._handleClickGet}">Add to cart</button>
      </div>
      <div>
        <a href="/product/${this.product.id}" class="card">
          <header>
            <figure>
              <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
              <img
                alt="${this.product.title}"
                src="http://localhost:9000/image/620/${this.product.image}"
                loading="lazy"
                width="1280" height="720">
            </figure>
          </header>
          <main>
            <h1>${this.product.title}</h1>
            <p>${this.product.description}</p>
            <p>Price : ${this.product.price} $</p>
          </main>
        </a>
      </div>     
    </div>
    `;
  }
}
customElements.define('product-card', ProductCard);
