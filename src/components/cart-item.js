import { html } from "lit";
import { Base } from "../Base";

export class CartItem extends Base {
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
    const img = this.querySelector("img");
    img.addEventListener("load", () => {
      this.loaded = true;
    });
  }

  render() {
    return html`
      <div class="product">
        <div class="product-image">
          <img
            src="${this.product.image}"
            alt="${this.product.title}"
            loading="lazy"
          />
        </div>
        <div class="product-details">
          <div class="product-title">${this.product.title}</div>
          <p class="product-description">${this.product.description}</p>
        </div>
        <div class="product-price">${this.product.price}</div>
        <div class="product-quantity">
          <input type="number" value="${this.product.quantity}" min="1" />
        </div>
        <div class="product-removal">
          <button class="remove-product">Remove</button>
        </div>
        <div class="product-line-price">${this.product.price}</div>
      </div>
    `;
  }
}
customElements.define("cart-item", CartItem);
