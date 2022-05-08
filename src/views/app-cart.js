import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/cart-product-item";

export class AppCart extends Base {
  constructor() {
    super();
    this.cart = {};
  }
  static get properties() {
    return {
      cart: { type: Object }
    }
  }
  
  firstUpdated(){
    console.log('called');
  }

  render() {
    return html`
      <div>
        <h1>Cart</h1>
        <h2>Total: ${this.cart.total}$</h2>
      </div>
      ${
        this.cart.products?.length > 0
        ? this.cart.products.map((product) => html`
        <cart-product-item
          .product="${product}"
        ></cart-product-item>
      `)
      : html`<p>Empty cart</p>`
    }
    `;

  }
}
customElements.define('app-cart', AppCart);
