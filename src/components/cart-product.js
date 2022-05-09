/**import */
import { html} from 'lit';
import { Base } from '../Base';


export class CartSell extends Base {
  constructor() {
    super();

    this.cart = {};
    this.loaded = false;
  }
  static get properties() {
    return {
      cart: { type: Object },
      loaded: { type: Boolean, state: true },
    }
  }

  firstUpdated() {
    this.querySelector('img').addEventListener('load', () => {
      this.loaded = true;
    });
  }

  
  _handleClickGet(param){
    deleteProductInCart(param)
  }

  render() {
    return html`
    <div>
      <div>
        <button @click="${this._handleClickGet}"delete</button>
      </div>

      <div>
        <a href="/product/${this.cart.id}" class="cardCart">
          <header>
            <figure>
              <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.cart.image})"></div>
              <img
                alt="${this.cart.title}"
                src="http://localhost:9000/image/620/${this.cart.image}"
                loading="lazy"
                width="1280" height="720">
            </figure>
          </header>
          <main>
            <h1>${this.cart.title}</h1>
            <p>${this.cart.description}</p>
            <p>${this.cart.price}</p>
          </main>
        </a>
      </div>

    </div>
    `;
  }
}
customElements.define('cart-sell', CartSell);
