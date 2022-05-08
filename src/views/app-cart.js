import { LitElement, html, css } from "lit";
import { Base } from "../Base";
import { getLocalCart, setLocalCartItem, unsetLocalCartItem } from "../idbHelpers";
import "../components/cart-product";

export class AppCart extends Base {
  constructor() {
    super();
    this.cart = [];
    this.total = 0;
    this.loaded = false;
  }
  static get properties() {
    return {
      cart: { type: Array },
      total: { type: Number },
      loaded: { type: Boolean },
    };
  }
  async decQuantity(e, p) {
    const cart = await getLocalCart();
    let product = cart.find((item) => item.id === p.id) || false;
    if (product) {
      product = { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 };
      await setLocalCartItem(product);
    }
  }
  async incQuantity(e, p) {
    const cart = await getLocalCart();
    let product = cart.find((item) => item.id === p.id) || false;
    if (product) {
      product = { ...product, quantity: product.quantity + 1 };
      await setLocalCartItem(product);
    }
  }
  async remove(e, p) {
    await unsetLocalCartItem(p);
  }
  removeAll() {
    this.cart.map(p => unsetLocalCartItem(p));
  }

  render() {
    this.total = this.cart
      .reduce((prevItem, currItem) => prevItem + currItem.price, 0)
      .toFixed(2);
    return html`
      <div class="CartContainer">
        <div class="Header">
          <h3 class="Heading">Shopping Cart</h3>
          <h5 class="Action" @click="${this.removeAll}">Remove all</h5>
        </div>
        ${this.cart.length
          ? this.cart.map(
              (product) =>
                html`<div class="Cart-Items">
                  <div class="image-box">
                    <figure>
                      <div
                        class="placeholder ${this.loaded ? "fade" : ""}"
                        style="background-image: url(http://localhost:9000/image/24/${product.image})"
                      ></div>
                      <img
                        src="${product.image}"
                        alt="${product.title}"
                        loading="lazy"
                        style=''height=120px; max-width=200px;'
                      />
                    </figure>
                  </div>
                  <div class="about">
                    <h1 class="title">${product.title}</h1>
                  </div>
                  <div class="counter">
                    <div class="btn" @click="${(e) => this.incQuantity(e, product)}">+</div>
                    <div class="count">${product.quantity ? product.quantity : 1}</div>
                    <div class="btn" @click="${(e) => this.decQuantity(e, product)}">-</div>
                  </div>
                  <div class="prices">
                    <div class="amount">$${product.price}</div>
                    <div class="remove" @click="${(e) => this.remove(e, product)}"><u>Remove</u></div>
                  </div>
                </div>`
            )
          : html`<p class="empty">No products in cart</p>`}
        <div class="checkout">
          <div class="total">
            <div class="total-amount">$${this.total}</div>
          </div>
          <button class="button">Checkout</button>
        </div>
      </div>
    `;
  }
}
customElements.define("app-cart", AppCart);
