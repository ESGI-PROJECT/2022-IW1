import { html } from 'lit';
import { Base } from '../Base';
import {addProductToCart, deleteProductFromCard} from "../api/cart";

export class ProductCartCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }

  get _select() {
    return (this.___input ??= this.renderRoot?.querySelector('select') ?? null);
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
      <div class="card">
        <a href="/product/${this.product.id}">
          <header>
            <figure>
              <div class="placeholder ${this.loaded ? "fade": ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
              <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
            </figure>
          </header>
          <main>
            <h1>${this.product.title}</h1>
            <h3>${this.product.quantity * this.product.price} (${this.product.price} x ${this.product.quantity})</h3>
            <p>${this.product.description}</p>
          </main>
        </a>
        <footer>
          <p>
            <select @change="${this._addToCart}" name="quantity" id="quantity-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <button @click="${this._deleteFromCart}">Delete from cart</button>
          </p>
        </footer>
      </div>
    `;
  }

  handleSelected(value) {
    if (value === this.product.quantity)
      return true;
    return false;
  }


  async _addToCart() {
    await addProductToCart(this.product, parseInt(this._select.value.trim()), 'change');
  }

  async _deleteFromCart() {
    await deleteProductFromCard(this.product);
  }
}
customElements.define('product-cart-card', ProductCartCard);