import { html } from "lit";
import { Base } from "../Base";
import { getCartProduct, setCartProduct } from "../idbHelpers";

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

  firstUpdated() {
    const img = this.querySelector("img");
    img.addEventListener("load", () => {
      this.loaded = true;
    });
  }

  async addToCart() {
    const prod = this.product;
    prod.quantity = 1;

    await setCartProduct(prod);
    alert("Product added to cart");
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
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
          <button @click=${this.addToCart}>Add to cart</button>
        </main>
      </div>
    `;
  }
}
customElements.define("product-card", ProductCard);
