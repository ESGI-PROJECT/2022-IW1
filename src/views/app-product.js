import { html } from "lit";
import { Base } from '../Base';
import { isInCart, addItemToCart, removeItemFromCart } from '../helpers/cartHelper';
export class AppProduct extends Base {
  constructor() {
    super();
    this.product = {};

    this.loaded = false;
    this.inCart = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
      inCart: { type: Boolean, state: true }
    };
  }

  firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', async () => {
      this.loaded = true;

      if( await isInCart(this.product.id) ){
        this.inCart = true;
      }
    });
  }

  async addInCartAction(e){
    e.preventDefault();
    await addItemToCart(this.product);
    this.inCart = true;
  }

  async removeFromCartAction(e){
    e.preventDefault();
    await removeItemFromCart(this.product.id);
    this.inCart = false;
  }

  render() {
    return html`
      <section class="product">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
        ${this.inCart 
          ? html`<button @click="${this.removeFromCartAction}" >Remove from Cart</button>`
          : html`<button @click="${this.addInCartAction}" >Add to Cart</button>`
        }
      </section>
    `;
  }
}
customElements.define('app-product', AppProduct);