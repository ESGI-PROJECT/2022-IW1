import { LitElement, html, css } from "lit";
import { Base } from "../Base";
import "../components/cart-item";

export class AppCart extends Base {
  constructor() {
    super();
    this.products = [];
  }
  static get properties() {
    return {
      products: { type: Array },
    };
  }
  render() {
    return this.products.map(
      (item) => html` <cart-item .product="${item.product}" .number="${item.number}"></cart-item> `
    );
  }
}
customElements.define("app-cart", AppCart);
