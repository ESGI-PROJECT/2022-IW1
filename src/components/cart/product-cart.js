import {LitElement, html, css} from 'lit';
import {
    decrementQuantity,
    deleteInCart,
    getInCart,
    getInCartItem,
    incrementQuantity,
    setInCart,
    setInCartItem
} from "../../idbHelper";
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
            count: {type: Number}
        }
    }

    firstUpdated() {
        this.querySelector('img').addEventListener('load', () => {
            this.loaded = true;
        });
    }

    _handleClickDelete() {
        deleteInCart(this.product.item.id);
    }

    async _handleClickIncrement() {
        const cart = await getInCartItem(this.product.item.id);
        cart.quantity = cart.quantity + 1;
        console.log(cart);
        await setInCartItem(cart);
    }

    async _handleClickDecrement() {
        const cart = await getInCartItem(this.product.item.id);
        if (cart.quantity > 1) {
            cart.quantity = cart.quantity - 1;
            console.log(cart);
            await setInCartItem(cart);
        }
    }

    render() {
        return html`
            <section>
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
                    <h1>${this.product.item.title}</h1>
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
