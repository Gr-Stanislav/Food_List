window.addEventListener('DOMContentLoaded', function() {
    
    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent (i = 1) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabsContent ();
    showTabContent ();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabsContent ();
                    showTabContent (i);
                }
            });
        }
    });




    // Timer

    const deadLine = '2022-12-31';

    function getTimeRemaining (endtime){
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date ());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

         return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
              };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock ();

        function updateClock (){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    };

    setClock ('.timer', deadLine);




    // Add Modal window

    let btn = document.querySelectorAll('.btn'),
        modalClose = document.querySelector('.modal__close'),
        windowModal = document.querySelector('.modal');


    btn.forEach(item => {
        item.addEventListener('click', () => {
            windowModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearTimeout(autoModal);
        });
    });
    
    function modalClosed () {
        windowModal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', modalClosed);

    // windowModal.addEventListener('click', modalClosed);

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" || e.code === "ArrowUp") {
            modalClosed ();
        };
    });

    // Auto add modal Window
        const autoModal = setTimeout(function (){
            windowModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        },5000);






    // Add block menu_item

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 30;
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
    

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // Run via MAMP----------------------------------------------------------
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
   

    


    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/Spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            
            postData('http://localhost:3000/requests', JSON.stringify(object))
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).catch(() => {
                statusMessage.textContent = message.failure;
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).finally(() => {
                form.reset();
            })
        });
    };

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));


});