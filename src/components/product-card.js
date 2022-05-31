import { html } from 'lit';
import { Base } from '../Base';
import { addToCart } from '../cartHelper';
import { CART_STORE_NAME, setRessource, getRessource  } from '../idbHelpers';

export class ProductCard extends Base {
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

  async addToCart() {
    addToCart(this.product);
  }
  
  render() {
    return html`
      <section class="card">
        <a href="/product/${this.product.id}">
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
        <footer>
          <span class="price">$ ${this.product.price}</span>
          <button class="cart-btn" @click="${this.addToCart}">Add to cart 🛍</button>
        </footer>
      </section>
    `;
  }
}
customElements.define('product-card', ProductCard);