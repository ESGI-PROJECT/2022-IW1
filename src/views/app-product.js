import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import {getItems, setItem} from "../idbHelper";

export class AppProduct extends Base {
  constructor() {
    super();

    this.product = {};
    this.loaded = true;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean },
    };
  }

  async _handleClickSet() {
    const store = await getItems();
    const article = (item) => item.item.id === this.product.id;
    const exist = store[0].storage.some(article)

    if (exist === true) {
      return alert("Cet article ce trouve déjà dans votre panier 😛");
    } else {
      store[0].storage.push({item: this.product, quantity: 1, sum: this.product.price});
      store[0].total += this.product.price;
      alert("Félicitation vous avez ajouté un nouvel article dans votre panier 🎉🥳");
      return await setItem(store);
    }
  }

  render() {
    return html`
      <section class="product">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : '' }" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              alt="${this.product.title}"
              src="http://localhost:9000/image/620/${this.product.image}"
              loading="lazy"
              width="1280" height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
        <button @click="${this._handleClickSet}">Add to cart</button>
      </section>
    `;
  }
}
customElements.define('app-product', AppProduct);
