import { html } from 'lit';
import { Base } from '../Base';
import { addOne, deleteAll, deleteOne } from '../events';

export class CartProduct extends Base {
    constructor() {
      super();
  
      this.product = {};
      this.number,
  
      this.loaded = false;
    }
  
    static get properties() {
      return {
        product: { type: Object },
        number: { type: Number},
        loaded: { type: Boolean, state: true }
      };
    }
  
    firstUpdated() {
      const img = this.querySelector('img');
      img.addEventListener('load', () => {
        this.loaded = true;
      });
    }
  
    render() {
      return html`
        <div class="card">
            <header>
                <figure>
                <div class="placeholder ${this.loaded ? "fade": ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
                <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
                </figure>
            </header>
            <main>
                <h1>${this.product.title}</h1>
                <p>${this.product.description}</p>
                <p>Number: ${this.number}</p>
            </main>
            <input type="button" id="${this.product.id}" value="Add 1" @click="${addOne}"/>
            <input type="button" id="${this.product.id}" value="Delete 1" @click="${deleteOne}"/>
            <input type="button" id="${this.product.id}" value="Delete All" @click="${deleteAll}"/>
        </div>
      `;
    }
  }
  customElements.define('cart-product', CartProduct);