import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { removeOne, removeProduct, addToCart } from "../cartHelpers";

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
  async addOneItem(product) {
    const [result] = await addToCart(product);
    this.cart = result;
  }
  async removeOneItem(product){
    const [result] = await removeOne(product);
    this.cart = result;
    
  }
  async delete(product){
    const [result] = await removeProduct(product);
    this.cart = result;
    
  }

  headerTable(){
    return html`<table>
    <thead>
        <tr>
            <th scope="col">Titre</th>
            <th scope="col">Prix</th>
            <th scope="col">Quantité</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>`;
  }
  bodyTable(){
    return this.cart.products.map((product)=>html`
      <tr>
          <td scopre="row">${product.title}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td>
            <div class="action">
              <button @click="${() => this.addOneItem(product)}">+ 1</button>
              ${product.quantity !== 1 ? html`
              <p>/</p>
              <button @click="${() => this.removeOneItem(product)}">- 1</button>
              `: null}
            </div>
            <button style="display: flex;margin: 0 auto;" @click="${() => this.delete(product)}">Delete</button>
          </td>
      </tr>
    `)
  }
  endTable() {
    return html`</tbody>
    </table>`;
  }

  render() {
    // console.log(this.cart)
    if(this.cart.products&&this.cart.products.length > 0){
      return html`
        <h1>Mon panier</h1>
        ${this.headerTable()}
        ${this.bodyTable()}
        ${this.endTable()}
        <h3 class="total">Total : ${this.cart.total} €</h3>
      `;
    }else{
      return html`
        <h1>Mon panier</h1>
        <p>No data</p>
      `;
    }
  }
}
customElements.define('app-cart', AppCart);
