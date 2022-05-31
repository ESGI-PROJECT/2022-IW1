import { html } from "lit";
import { Base } from '../Base';
import { addToCart } from "../cartHelper";

export class AppProduct extends Base {
  constructor() {
    super();
    this.product = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
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
      <section class="product">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p class="price">$ ${this.product.price}</p>
          <p>${this.product.description}</p>
        </main>
        <footer>
          <button class="cart-btn" @click="${() => addToCart(this.product)}">Add to cart 🛍</button>
        </footer>
      </section>
    `;
  }
}
customElements.define('app-product', AppProduct);