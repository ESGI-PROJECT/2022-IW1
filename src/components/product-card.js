import { html } from "lit";
import { Base } from "../Base";
import "./product-addtocart";

export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
    this.withAdd = true;
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
    return html` <a href="/product/${this.product.id}" class="card">
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
        </main>
      </a>
      ${this.withAdd
        ? html`<product-addtocart .product=${this.product}></product-addtocart>`
        : null}`;
  }
}
customElements.define("product-card", ProductCard);
