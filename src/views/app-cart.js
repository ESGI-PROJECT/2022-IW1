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
        return this.products.map(product => html`
            <product-cart 
                    .product="${product}"
            ></product-cart>
        `)
    }
}

customElements.define('app-cart', AppCart);
