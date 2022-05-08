import { html } from "lit";
import { Base } from "../Base";
import { getLocalCart, setLocalCartItem } from "../idbHelpers";

export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0));
    const img = this.querySelector("img");
    img.addEventListener("load", () => {
      this.loaded = true;
    });
  }

  async addToCart(e) {
    const cart = await getLocalCart();
    let product = cart.find((item) => item.id === this.product.id) || false;
    if (product) {
      product = { ...product, quantity: product.quantity + 1 };
    } else {
      product = {
        ...this.product,
        quantity: 1,
      };
    }
    await setLocalCartItem(product);
  }

  render() {
    return html`
      <div class="card">
        <a href="/product/${this.product.id}">
          <header>
            <figure>
              <div
                class="placeholder ${this.loaded ? "fade" : ""}"
                style="background-image: url(http://localhost:9000/image/24/${this
                  .product.image})"
              ></div>
              <img
                src="${this.product.image}"
                alt="${this.product.title}"
                loading="lazy"
              />
            </figure>
          </header>
        </a>
        <main>
          <div class="card-main">
            <a href="/product/${this.product.id}">
              <div>
                <h1>${this.product.title}</h1>
                <p>${this.product.description}</p>
              </div>
            </a>
            <button class="add-to-cart-btn" @click="${this.addToCart}">
              Buy
            </button>
          </div>
        </main>
      </div>
    `;
  }
}
customElements.define("product-card", ProductCard);
