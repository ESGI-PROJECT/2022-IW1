import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/cart-product";

export class AppCart extends Base {
    constructor(){
        super();
        this.items = [];
    }
    static get properties(){
        return{
            items: {type: Array}
        };
    }
    render(){
        return this.items.map((item) => html`
        <cart-product .product="${item.product}" .number="${item.number}">
        </cart-product>
        `);
    }
}
customElements.define('app-cart', AppCart);