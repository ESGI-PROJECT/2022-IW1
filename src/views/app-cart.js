import { html } from 'lit';
import { Base } from '../Base';
import "../components/product-card";
import { deleteCart } from '../idbHelpers';

export class AppCart extends Base {
  constructor() {
    super();
    this.cart =[];
    this.quantities = [];

    const ids = this.cart.map(item => item.id);
    const maxId = Math.max(...ids);
    this.quantities = this.cart.length > 0 ? new Array(maxId).fill(1): [];
  }
  static get properties() {
    return {
      cart: { type: Array },
      quantities: { type: Array }
    }
  }

  getQuantities() {
    return this.quantities;
  }

  deleteFromCart(id) {
    deleteCart(id);
    console.log('deleted');
  }

  setQuantites() {
    this.quantities = this.cart.map(() => 1);
  }

  reAddToCart(id) {
    this.quantities[id - 1]++;
  }

  render() {
    return this.cart.map((product, index) => html`
      <section class="cart">
        <main>
          <product-card
            .product="${product}"
          >
            <p>Quantité: ${this.quantities[index]}</p>
            <button @click='${() => this.deleteFromCart(product.id)}'>Retirer du panier</button>
            <button @click='${() => this.reAddToCart(product.id)}'>Augmenter la quantité</button>
          </product-card>
        </main>
      </section>
    `);
  }
}
customElements.define('app-cart', AppCart);