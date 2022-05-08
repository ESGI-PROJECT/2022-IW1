import { html } from 'lit';
import { Base } from '../Base';
import { isInCart } from '../helpers/cartHelper';
export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
    this.inCart = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
      inCart: { type: Boolean, state: true },
    };
  }

  async firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', () => {
      this.loaded = true;
    });
    if( await isInCart(this.product.id) ){
      this.inCart = true;
    }
  }

  render() {
    return html`
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
        ${this.inCart 
          ? html`<button @click="${this.removeFromCartAction}" >Remove from Cart</button>`
          : html`<button @click="${this.addInCartAction}" >Add to Cart</button>`
        }
      </a>
    `;
  }
}
customElements.define('product-card', ProductCard);