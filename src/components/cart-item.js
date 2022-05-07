import { html } from "lit";
import { addQuantité, deleteFromCart, deleteQuantité } from "../api/cart";
import { Base } from "../Base";

export class CartItem extends Base {
  constructor() {
    super();

    this.product = {};
    this.number = 1;
    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      number: { type: Number },
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
      <div id="major">
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
            <h3 class="nb" >Quantité : ${this.number}</h3>
          </main>
          <div>
            <button class="btnModify" value="${this.product.id}" @click="${addQuantité}">+ 1</button>
            <button class="btnModify" value="${this.product.id}" @click="${deleteQuantité}">- 1</button>
            <button class="btnModify" value="${this.product.id}" @click="${deleteFromCart}">Supprimer du panier</button>
          </div>
        </a>
      </div>
    `;
  }
}
customElements.define("cart-item", CartItem);
