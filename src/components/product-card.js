import { html } from "lit";
import { Base } from "../Base";
import "./cart-button";

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

  render() {
    return html`
      <a href="/product/${this.product.id}" class="card">
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
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
          <cart-button
            .product="${this.product}"
            @click="${this._handleClick}"
          ></cart-button>
        </main>
      </a>
    `;
  }

  _handleClick(e) {
    e.preventDefault();
    
  }
}
customElements.define("product-card", ProductCard);
