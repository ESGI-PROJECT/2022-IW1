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
            <section>
                <h1>My cart</h1>
                <div>${this.products?.total || 0}</div>
                <div>
                     ${ typeof this.products?.items != "undefined" ?  this.products?.items.map((product) => html`
                        <product-card-cart
                            .product="${product}"
                        ></product-card-cart>
                    `) : ""}
                </div>            
            </section>` 
    }
}

customElements.define('app-cart', AppCart) ;