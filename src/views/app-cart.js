import {html} from 'lit';
import {Base} from '../Base';

export class AppCart extends Base {

    render() {
        return html`
            <div>
                <p>TEST PANIER</p>
            </div>
        `
    }
}

customElements.define('app-cart', AppCart);
