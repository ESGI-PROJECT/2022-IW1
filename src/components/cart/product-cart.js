import {LitElement, html, css} from 'lit';
import {getItems, setItem} from "../../idbHelper";
import {Base} from "../../Base";

export class ProductCart extends Base {
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

    async _handleClickDelete() {
        const store = await getItems();
        const article = store[0].storage.findIndex(item => item.item.id === this.product.item.id);

        if (article > -1) {
            store[0].total -= store[0].storage[article].sum;
            store[0].storage.splice(article, 1);
            await setItem(store);
            location.reload();
        }
    }

    async _handleClickIncrement() {
        const store = await getItems();
        const article = store[0].storage.findIndex(item => item.item.id === this.product.item.id);

        store[0].storage[article].quantity = store[0].storage[article].quantity + 1;
        store[0].storage[article].sum += store[0].storage[article].item.price;
        store[0].total += store[0].storage[article].item.price;

        await setItem(store);
        location.reload();
    }

    async _handleClickDecrement() {
        const store = await getItems();
        const article = store[0].storage.findIndex(item => item.item.id === this.product.item.id);

        if (store[0].storage[article].quantity > 1) {
            store[0].storage[article].quantity = store[0].storage[article].quantity - 1;
            store[0].storage[article].sum -= store[0].storage[article].item.price;
            store[0].total -= store[0].storage[article].item.price;

            await setItem(store);
            location.reload();
        }
    }

    render() {
        return html`
            <section style="margin-top: 2%">
                <header>
                    <figure>
                        <div class="placeholder ${this.loaded ? 'fade' : ''}"
                             style="background-image: url(http://localhost:9000/image/24/${this.product.item.image})"></div>
                        <img
                                alt="${this.product.item.title}"
                                src="http://localhost:9000/image/620/${this.product.item.image}"
                                loading="lazy"
                                width="90" height="90">
                    </figure>
                </header>
                <main>
                    <h4>${this.product.item.title}</h4>
                    <p>${this.product.sum} €</p>
                </main>
                <button @click="${this._handleClickDelete}">Delete</button>
                <button @click="${this._handleClickDecrement}">-</button>
                <span>${this.product.quantity}</span>
                <button @click="${this._handleClickIncrement}">+</button>
            </section>
        `;
    }
}

customElements.define('product-cart', ProductCart);
