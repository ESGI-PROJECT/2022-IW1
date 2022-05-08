import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/cart";

export class AppCart extends Base {
  constructor(products = []) {
    super();

    this.products = products;
  }

  static get properties() {
    return {
      products: { type: Array },
    };
  }


  render() {
    return this.products.map(product => html `
      <product-cart
        .product="${product}"
      ></product-cart>
    `);
  }
}
customElements.define('app-cart', AppCart);
