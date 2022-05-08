import { LitElement, html, css } from 'lit';
import { Base } from '../Base';

export class Cart extends Base {

  constructor(product) {
    super();

    this.product = product;


    this.loaded = false;

  }


  firstUpdated() {
    const image = this.querySelector('img');
    image.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  render() {
    return html `
      <div class="card">
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
        </main>
      </div> 
    `;
  }
}
customElements.define('product-cart', Cart);
