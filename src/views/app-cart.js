import { html } from "lit";
import { Base } from "../Base";

export class AppCart extends Base {
    constructor() {
        super() ; 
        this.products = {items : []} ; 

    }
    static get properties() {
        return {
            products : {type: Object} 
        }
    }
    render() {
        return html`
            <div>
                <div>${this.products?.total || 0} products in cart</div>
                <div>
                     ${ typeof this.products?.items != "undefined" ?  this.products?.items.map((product) => html`
                        <product-card-cart
                            .product="${product}"
                        ></product-card-cart>
                    `) : ""}
                </div>            
            <div>` 
    }
}

customElements.define('app-cart', AppCart) ;