import {html} from "lit";
import {Base} from '../Base';
import {getCart, removeItemFromCart} from "../api/cart";

export class AppCart extends Base {
    constructor() {
        super();
        this.cart = [];
        this.loaded = false;
    }

    static get properties() {
        return {
            cart: {type: Object},
        };
    }

    firstUpdated() {
        const img = this.querySelector('img');
        img?.addEventListener('load', () => {
            this.loaded = true;
        });
    }

    async removeProduct(product) {
        await removeItemFromCart(product)
        this.cart = await getCart();
    }

    render() {
        return html`
            <section class="cart">
                <h1>Cart</h1>
                ${this.cart.products.length < 1 ? 'Your cart is empty' : ''}
                ${this.cart.products.map((product) => {
                    return html`
                        <div class="cart__product">
                            <img src="${product.image}" alt="${product.name}"/>
                            <div class="cart__product__info">
                                <h4>${product.title}</h4>
                                <p>${product.description.substring(0, 30) + '...'}</p>
                                <p>${product.price}€</p>
                            </div>
                            <div class="cart__product__control">
                                <button
                                        class="cart__product__control__remove"
                                        @click="${() => this.removeProduct(product)}">
                                    Remove
                                </button>
                            </div>
                        </div>
                    `;
                })}
            </section>
        `;
    }
}

customElements.define('app-cart', AppCart);