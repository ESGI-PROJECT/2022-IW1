import { html } from "lit";
import { Base } from "../Base";
import { getRessource, setRessource } from "../idbHelpers";
export class CartButton extends Base {
  constructor() {
    super();

    this.product = {};
  }

  static get properties() {
    return {
      product: { type: Object },
    };
  }

  render() {
    return html`<button class="button-cart" @click="${this._handleClick}">
      Add to cart
    </button> `;
  }

  async _handleClick(e) {
    this.product.quantity = 1;
    const storedCartItem = await getRessource(this.product.id, "Cart");

    // await setRessource(this.product, "Cart");

    console.log(storedCartItem);
    if (storedCartItem === undefined) {
      this.product.quantity = 1;
      await setRessource(this.product, "Cart");
    } else {
      storedCartItem.quantity = Number(storedCartItem.quantity) + 1;
      const AddedCartItem = await setRessource(storedCartItem, "Cart");
      console.log(storedCartItem);
    }

    alert("Added successfully!!! go to cart page to see all items");
  }
}
customElements.define("cart-button", CartButton);
