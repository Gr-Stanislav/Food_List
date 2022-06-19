function card() {
        // Add block menu_item

        class MenuCard {
            constructor (src, alt, title, descr, price, parentSelector) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 36;
                this.changeToUAH();
            }
    
            changeToUAH() {
                this.price = this.transfer * this.price;
            }
    
            render() {
                const element = document.createElement('div');
                element.innerHTML = `
                    <div data-wow-delay="0.5s" class="menu__item wow animate__animated animate__zoomInUp">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>
                </div>
                `;
    
                this.parent.append(element);
            }
        }
    
    
            async function getResource(url) {
            let res = await fetch(url);
        
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
        
            return await res.json();
        }
        
    
        // Run via MAMP----------------------------------------------------------
        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });
}

export default card;