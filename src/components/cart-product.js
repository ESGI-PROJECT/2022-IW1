export default {
  props: {
    id: null,
    title: "",
    image: null
  },
  render() {
    const template = document.createElement('div');
    template.innerHTML = html`
      <div class="cart-item">
        <header>
          <figure>sss
            <div class="placeholder" style="background-image: url(http://localhost:9000/image/24/${this.props.image})"></div>
            <img src="" alt="${this.props.title}" data-src="${this.props.image}">s
          </figure>
        </header>
        <main>
          <h1>${this.props.title}</h1>
        </main>
      </div>
    `;
    const card = template.querySelector('.cart-item');
    console.log(card)
    return card;
  }
};