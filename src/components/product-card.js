import {LitElement, html, css} from 'lit';
import {Base} from '../Base';
import {setInCart} from "../idbHelper";

export class ProductCard extends Base {
    constructor() {
        super();

        this.product = {};
        this.loaded = false;
    }

    static get properties() {
        return {
            product: {type: Object},
            loaded: {type: Boolean, state: true},
        }
    }

    firstUpdated() {
        this.querySelector('img').addEventListener('load', () => {
            this.loaded = true;
        });
    }

    _handleClickGet() {
        setInCart(this.product);
        console.log(this.product);
    }

    render() {
        return html`
            <div>
                <button @click="${this._handleClickGet}">Add to cart</button>
                <a href="/product/${this.product.id}" class="card">
                    <header>
                        <figure>
                            <div class="placeholder ${this.loaded ? 'fade' : ''}"
                                 style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
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
                </a>
            </div>
        `;
    }
}

customElements.define('product-card', ProductCard);
