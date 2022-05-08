import { addToCart, getIDBCart, removeFromCart } from "../idbHelpers";
import { Base } from "../Base";
import { html } from "lit";
import "../components/product-card";
import { syncCart } from "../api/cart";

export class AppCart extends Base {
  constructor() {
    super();
    this.cart = [];
  }

  static get properties() {
    return {
      cart: { type: Array },
    };
  }

  async handleIncrement(product) {
    await addToCart(product);
    await syncCart(this.cart);
    this.cart = await getIDBCart();
  }

  async handleDecrement(product) {
    await removeFromCart(product);
    await syncCart(this.cart);
    this.cart = await getIDBCart();
  }

  render() {
    console.log("cart", this.cart);

    if (this.cart.length === 0) {
      return html`<p>No products in cart</p> `;
    }

    return (
      this.cart.length >= 1 &&
      this.cart.map((product) => {
        console.log(product);
        return html` <product-card
            .product=${product}
            .withAdd=${false}
          ></product-card>
          <button @click=${() => this.handleIncrement(product)}>+</button
          >${product.amount}<button
            @click=${() => this.handleDecrement(product)}
          >
            -
          </button>`;
      })
    );
  }
}
customElements.define("app-cart", AppCart);
