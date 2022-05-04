import { Base } from "../Base";
import { html } from "lit";
import { deleteCartProduct, updateCartProductQuantity } from "../idbHelpers";
import {
  updateCartProductQuantity as updateAPICartProductQuantity,
  removeItemFromCart,
} from "../api/cart";
export class AppCart extends Base {
  constructor() {
    super();
    this.cart = {};
  }
  static get properties() {
    return {
      cart: { type: Object },
    };
  }

  async updateQuantity(id, quantity) {
    if (navigator.onLine) {
      // g pa trouvé comment reprendre la const NETWORK_STATE
      await updateAPICartProductQuantity(id, quantity);
    } else {
      await updateCartProductQuantity(id, quantity);
    }
  }
  async deleteItem(product) {
    if (navigator.onLine) {
      await removeItemFromCart(product);
    } else {
      await deleteCartProduct(product);
    }
    // Remove HTML element
    const productElem = document.getElementById(`product-${product.id}`);
    productElem.remove();
  }

  render() {
    console.log(this.cart);
    return html`
      <div class="cart">
        <h1>Mon Panier</h1>
        ${this.cart.products.length === 0
          ? html`<p>Votre panier est vide</p>`
          : html`<div class="cart-items">
              ${this.cart.products.map(
                (product) => html`
                  <div class="cart-item" id="product-${product.id}">
                    <div class="cart-item-image">
                      <img src="${product.image}" width="50" loading="lazy" />
                    </div>
                    <div class="cart-item-info">
                      <h2>${product.title}</h2>
                      <p>${product.description}</p>
                      <p>Prix: ${product.price}$</p>
                      <label for="quantity">Quantité:</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        name="quantity"
                        value="${product.quantity}"
                        @change=${(e) =>
                          this.updateQuantity(
                            product.id,
                            e.target.valueAsNumber
                          )}
                      />
                      <button @click="${() => this.deleteItem(product)}">
                        Supprimer
                      </button>
                    </div>
                  </div>
                `
              )}
              <p>Total: ${this.cart.total}$</p>
            </div>`}
      </div>
    `;
  }
}

customElements.define("app-cart", AppCart);
