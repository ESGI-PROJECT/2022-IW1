import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-cart-card";

export class AppCart extends Base {
  constructor() {
    super();
    this.products = [];
  }
  static get properties() {
    return {
      products: { type: Object }
    }
  }

  headerTemplate() {
    return html`
      <header>
        <h1>Total :  ${this.products.total}€</h1>
      </header>
    `;
  }

  mainTemplate(){
    if (this.products.items && this.products.items.length >= 1){
      return this.products.items.map((product) => html`
      <product-cart-card
        .product="${product}"
      ></product-cart-card>
    `);
    }
    else{
      return html`
          <div>
            <h1>Vous n'avez encore aucun produit dans votre panier</h1>
          </div>
      `;
    }
  }

  render() {
    return html`
      ${this.headerTemplate()}
      <main>
        ${this.mainTemplate()}
      </main>
    `;
  }
}
customElements.define('app-cart', AppCart);