import { html } from "lit";
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
    const htmlProductTable = this.products.map(
      (product) => html`<cart-item .product="${product}"></-card> `
    );
    return html`
      <section class="cart">
        <h1>Shopping Cart</h1>

        <div class="shopping-cart">
          <div class="column-labels">
            <label class="product-image">Image</label>
            <label class="product-details">Product</label>
            <label class="product-price">Price</label>
            <label class="product-quantity">Quantity</label>
            <label class="product-removal">Remove</label>
            <label class="product-line-price">Total</label>
          </div>

          ${htmlProductTable}

          <div class="totals">
            <div class="totals-item">
              <label>Subtotal</label>
              <div class="totals-value" id="cart-subtotal">71.97</div>
            </div>
            <div class="totals-item">
              <label>Tax (5%)</label>
              <div class="totals-value" id="cart-tax">3.60</div>
            </div>
            <div class="totals-item">
              <label>Shipping</label>
              <div class="totals-value" id="cart-shipping">15.00</div>
            </div>
            <div class="totals-item totals-item-total">
              <label>Grand Total</label>
              <div class="totals-value" id="cart-total">90.57</div>
            </div>
          </div>

          <button class="checkout">Checkout</button>
        </div>
      </section>
    `;
  }
}
customElements.define("app-cart", AppCart);
