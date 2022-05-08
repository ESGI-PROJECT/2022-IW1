import { html } from "lit";
import { Base } from "../Base";
import { unsetRessource, setRessource } from "../idbHelpers";

export class CartItem extends Base {
  constructor() {
    super();
    this.product = {};
    this._addToTotalAmount;
    this.removeItemFromList;
    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object, state: true },
      loaded: { type: Boolean, state: true },
    };
  }

  firstUpdated() {
    this.addToTotalAmount(this.product.amount);

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
          <input
            type="number"
            value="${this.product.quantity}"
            min="1"
            @keyup="${this._changeQuantity}"
          />
        </div>
        <div class="product-removal">
          <button class="remove-product" @click="${this._removeProduct}">
            Remove
          </button>
        </div>
        <div class="product-line-price">${this.product.amount}</div>
      </div>
    `;
  }

  async _changeQuantity(e) {
    const quantity = Number(e.target.value);
    if (this.product.quantity !== quantity && quantity !== 0) {
      const amount = Number(quantity * this.product.price).toFixed(2);
      // this._addToTotalAmount(amount - Number(this.product.amount).toFixed(2));

      // this.requestUpdate();
      const newTotal = Number(amount - this.product.amount).toFixed(2);
      this.addToTotalAmount(newTotal);

      this.product = { ...this.product, quantity: quantity, amount: amount };
      await setRessource(this.product, "Cart");

      console.log("Added successfully!!! go to cart page to see all items");
      console.log(this.product.quantity);
    }
  }
  _removeProduct = async (e) => {
    let text = "Are you sure you want to delete this item?";
    if (confirm(text) == true) {
      await unsetRessource(this.product.id, "Cart");
      console.log("Deleted successfully!!!");
      this.removeItemFromList(this.product.id);
    }
  };
}
customElements.define("cart-item", CartItem);
