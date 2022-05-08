import { html } from 'lit';
import { Base } from '../Base';
import "../components/product-card";
import { setCart, getCartProduct } from '../idbHelpers';

export class AppHome extends Base {
  constructor() {
    super();
    this.products = [];
  }
  static get properties() {
    return {
      products: { type: Array }
    }
  }

  addToCart(myProduct) {
    // AppCart.cart.push(this.product);
    if (getCartProduct(myProduct.id).then(product => product === undefined)) {
      console.log('il est undefined');
      setCart(myProduct);
    }
    console.log('cliqué');
  }

  render() {
    return this.products.map((product) => html`
      <product-card
        .product="${product}"
      >
      <button @click='${() => this.addToCart(product)}'>Ajouter au panier</button>
      </product-card>
    `);
  }
}
customElements.define('app-home', AppHome);
