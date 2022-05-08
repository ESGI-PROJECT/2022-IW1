import { html } from "lit";
import { Base } from '../Base';

export class AppCart extends Base {
  constructor() {
    super();
    this.cart = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      cart: { type: Object },
      loaded: { type: Boolean, state: true }
    };
  }

  render() {
    return html`
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

    <div class="product">
        <div class="product-image">
        <img src="http://localhost:9000/image/500/${this.product.image}">
        </div>
        <div class="product-details">
        <div class="product-title">${this.product.title}</div>
        <p class="product-description">${this.product.description}</p>
        </div>
        <div class="product-quantity">
        <input type="number" value="2" min="1">
        </div>
        <div class="product-removal">
        <button class="remove-product">
            Remove
        </button>
        </div>
    </div>

    <div class="product">
        <div class="product-image">
        <img src="https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png">
    </div>
  
    `;
  }
}
customElements.define('app-cart', AppCart);
