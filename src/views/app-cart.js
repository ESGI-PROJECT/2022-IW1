import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

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
        return this.items.map((product)=> "hi");
    }
}
customElements.define('app-cart', AppCart);