import {html} from 'lit';
import "../components/cart/product-cart";
import {Base} from "../Base";

export class AppCart extends Base {
    constructor() {
        super();

        this.products = [];
    }

    static get properties() {
        return {
            products: {type: Array},
        };
    }

    render() {
        return html`
            ${this.products[0].storage.map(product => html`
            <product-cart 
                    .product="${product}"
            ></product-cart>
        `)}
            <br>
            <p>Il y a ${this.products[0].storage.length} article(s) dans votre panier</p>
            <br>
            <p>Total : ${this.products[0].total} €</p>
    `}
}

customElements.define('app-cart', AppCart);
