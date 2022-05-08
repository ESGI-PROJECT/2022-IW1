import { html } from "lit";
import { Base } from "../Base";
import "../components/cart-item";

export class AppCart extends Base {
  constructor() {
    super();
    this.products = [];
    this.totalAmount = 0;
  }
  static get properties() {
    return {
      products: { type: Array },
      totalAmount: { type: Number, state: true },
    };
  }
  _addToTotalAmount = (amount) => {
    // this.totalAmount = parseInt(this.totalAmount) + parseInt(amount);
    console.log("total : " + this.totalAmount);

    // console.log(this.totalAmount);
  };

  removeItemFromList = (productId) => {
    this.products = this.products.filter((product) => product.id != productId);
  };

  render() {
    const htmlProductTable = this.products.map(
      (product) =>
        html`<cart-item .product ="${{ ...product }}" .addToTotalAmount ="${
          this._addToTotalAmount
        }" .removeItemFromList=${this.removeItemFromList}></-card> `
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



          <button class="checkout">Checkout</button>
        </div>
      </section>
    `;
  }
}
{/* <div class="totals">
<div class="totals-item totals-item-total">
  <label>Total</label>
  <div class="totals-value" id="cart-total">
    ${this.totalAmount}
  </div>
</div>
</div> */}
customElements.define("app-cart", AppCart);
