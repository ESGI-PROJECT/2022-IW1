import {html} from 'lit';
import {Base} from '../Base';
import {deleteInCart} from "../idbHelper";
import product from "../components/product";

export class AppCart extends Base {
    constructor() {
        super();

        this.products = {};
        this.loaded = true;
    }

    static get properties() {
        return {
            products: {type: Object},
            loaded: {type: Boolean},
        };
    }

    _handleClickDelete() {
        deleteInCart(product.id);
        console.log();
    }

    render() {
        return this.products.map(product => html`
            <div>
                <a>
                    <header>
                        <figure>
                            <div class="placeholder ${this.loaded ? 'fade' : ''}"
                                 style="background-image: url(http://localhost:9000/image/24/${product.image})"></div>
                            <img
                                    alt="${product.title}"
                                    src="http://localhost:9000/image/620/${product.image}"
                                    loading="lazy"
                                    width="250" height="120">
                        </figure>
                    </header>
                    <main>
                        <h1>${product.title}</h1>
                        <p>${product.description}</p>
                    </main>
                </a>
                <button @click="${this._handleClickDelete}">Delete</button>
                <button>Count</button>
            </div>
        `)
    }
}

customElements.define('app-cart', AppCart);
