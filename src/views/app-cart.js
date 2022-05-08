import { html } from 'lit';

import { Base } from '../Base';
import '../components/product-cart';


export class AppCart extends Base {
    constructor() {
        super();
        this.products = [];
    }
    static get properties() {
        return {
            products: { type: Array }
        }
    }
    render() {
        
        const products = this.products.map((product) => html`
            <product-cart
                .product="${product}"
            ></product-cart>
        `);

        return html`
            <div>
                <h1>Cart</h1>
                <div class="products">
                    ${products}
                </div>
            </div>
        `;
    
    }



}
customElements.define('app-cart', AppCart);
