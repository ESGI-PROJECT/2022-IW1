import { html } from 'lit';
import { Base } from '../Base';

export class AppCart extends Base {
  constructor() {
    super();
    this.cart =[];
  }
  static get properties() {
    return {
      cart: { type: Array }
    }
  }

  render() {
    return html`
      <section class="cart">
        <main>
          <h2>Cart</h2>
        </main>
      </section>
    `;
  }
}
customElements.define('app-cart', AppCart);