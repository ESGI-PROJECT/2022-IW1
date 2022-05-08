import { html } from "lit";
import { Base } from "../Base";
import { addToCart, getIDBCart } from "../idbHelpers";
import { syncCart } from "../api/cart";

class ProductAddToCart extends Base {
  constructor() {
    super();

    this.product = {};
  }

  async handleClick() {
    console.log("Add to cart", this.product);
    await addToCart(this.product);
    await syncCart(await getIDBCart());
  }

  render() {
    return html`
      <button class="add-to-cart" @click=${() => this.handleClick()}>
        add to cart
      </button>
    `;
  }
}

customElements.define("product-addtocart", ProductAddToCart);
