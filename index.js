class UiPokemon extends HTMLElement {

    static get observedAttributes() {
        return ['name', 'type', 'hp', 'image']
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    getTypeColor(type) {
        const colors = {
            'Plante': 'green',
            'Feu': 'orange',
            'Eau': 'blue',
            'Electrique': 'yellow',
            'Psy': 'pink',
        };
        return colors[type] || 'grey';
    }

    render() {
        const name = this.getAttribute("name");
        const type = this.getAttribute("type");
        const hp = this.getAttribute("hp");
        const image = this.getAttribute("image");
        const typeColor = this.getTypeColor(type);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: white;
                    border: 2px solid grey;
                   
                }

                

                img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                }

                .name {
                    font-weight: bold;
                    font-size: 1rem;
                    margin: 8px 0 4px;
                }

                .type {
                    display: inline-block;
                    background: ${typeColor};
                    color: white;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    margin-bottom: 6px;
                }

                .hp {
                    font-size: 0.85rem;
                    color: grey;
                }

                .pokeball-btn {
                    margin-top: 10px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .pokeball-btn:hover {
                    transform: scale(1.3) rotate(20deg);
                }
            </style>

            <div class="card">
                <img src="${image}" alt="${name}">
                <p class="name">${name}</p>
                <span class="type">${type}</span>
                <p class="hp"> HP : ${hp}</p>
                <button class="pokeball-btn" title="Capturer ${name}">o</button>
            </div>
        `;

        const btn = this.shadowRoot.querySelector('.pokeball-btn');
        btn.addEventListener('click', () => {
            const event = new CustomEvent("pokemonCapture", {
                detail: { name, type, hp, image },
                bubbles: true
            });
            this.dispatchEvent(event);
        });
    }
}

customElements.define("ui-pokemon", UiPokemon);
document.addEventListener('pokemonCapture', (event) => {
    const { name, type, hp, image } = event.detail;

    const details = document.getElementById('details-pokemon');

    const typeColors = {
        'Plante': 'green', 'Feu': 'orange', 'Eau': 'blue',
        'Electrique': 'yellow', 'Psy': 'pink', 'Normal': 'grey',
    };
    const color = typeColors[type] || 'grey';

    details.innerHTML = `
        <img src="${image}" alt="${name}" style="width:150px; display:block; margin:auto;">
        <h3 style="text-align:center">${name}</h3>
        <p style="text-align:center">
            <span style="background:${color}; color:white; padding:3px 12px; border-radius:20px; font-size:0.9rem">${type}</span>
        </p>
        <p style="text-align:center"> HP : ${hp}</p>
        <p style="text-align:center;; font-weight:bold;"> ${name} a été capturé !</p>
    `;
});