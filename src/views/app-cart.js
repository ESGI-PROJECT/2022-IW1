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
      <h1>Cart</h1>
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
