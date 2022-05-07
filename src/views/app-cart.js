import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/cart-product";

export class AppCart extends Base {
    constructor(){
        super();
        this.cart = {
            id:1,
            total: 0,
            products: []
        };
    }
    static get properties(){
        return{
            cart: {type: Object}
        };
    }
    render(){
        return html`
        <section>
        <h1>Total : ${this.cart.total}</h1>
        ${this.cart.products.map((item) => 
            html`
                <cart-product .product="${item.product}" .number="${item.number}">
                </cart-product>`
        )}
        </section>`;
    }
}
customElements.define('app-cart', AppCart);