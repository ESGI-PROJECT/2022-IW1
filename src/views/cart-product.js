/**import */
import { html } from 'lit';
import { Base } from '../Base';
import "../components/cart-product";

export class CartHome extends Base {
  constructor() {
    super();
    this.cart = [];
  }
  static get properties() {
    return {
      cart: { type: Array },
    };
  }
  render() {
    return this.cart.map(product => html`
    <'cart-sell'
      .cart="${product}"
    ></'cart-sell'> 
  `)
  }
}
customElements.define('cart-product', CartHome);
