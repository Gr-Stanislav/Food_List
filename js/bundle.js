/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
        //Calc

        const result = document.querySelector('.calculating__result span');
        let sex = "famele", 
            height, 
            weight, 
            age, 
            ratio = 1.375;
    
        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio){
                result.textContent = '____';
                return;
            }
    
            if(sex === "famele"){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        function getStaticInformation(parentSelector, activeClass) {
            const elements = document.querySelectorAll(`${parentSelector} div`);
    
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                    } else {
                        sex = e.target.getAttribute('id');
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal();
                });
            });
        }
    
        getStaticInformation('#gender', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    
    
        function getDynamicInformation (selector){
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
                switch(input.getAttribute('id')){
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
    
                calcTotal();
            });
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
                                <div class="menu__item-cost">????????:</div>
                                <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms(){
        // Forms

        const forms = document.querySelectorAll('form');
        const message = {
            loading: 'img/Spinner.svg',
            success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
            failure: '??????-???? ?????????? ???? ??????...'
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
                statusMessage.style = "text-align: center";
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
                });
            });
        }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
        // SLIDER-------------------------

        let slides = document.querySelectorAll('.offer__slide'),
        curent = document.querySelector('#current'),
        total = document.querySelector('#total'),
        btnPrev = document.querySelector('.offer__slider-prev'),
        btnNext = document.querySelector('.offer__slider-next');
    let numElement = 1;
    
        curent.textContent = numElement +1;

    showSlider(slides);

    function showSlider (bod) {

        if (curent.textContent < 1){
            curent.textContent = slides.length;
        }
        
        if (curent.textContent > slides.length) {
            curent.textContent = 1;
        }

        bod.forEach(item => {
            item.style.display = 'none';
        });

        bod[`${numElement}`].style.display = 'block';

        if (bod.length < 9) {
            total.textContent = `0${bod.length}`;
        }

        if (curent.textContent < 9) {
            curent.textContent = `0${curent.textContent}`;
        }

    }

    btnPrev.addEventListener('click', () => {
        numElement --;
        if (numElement < 0) {
            numElement = slides.length - 1;
        }
        curent.textContent = `${curent.textContent - 1}`
        showSlider(slides);
    });
    
    btnNext.addEventListener('click', () => {
        numElement ++;
        if (numElement > slides.length - 1) {
            numElement = 0;
        }
        curent.textContent = `${+curent.textContent + 1}`
        showSlider(slides);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
    }

    function showTabContent (i = 1) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
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
 
     }
 
     setClock ('.timer', deadLine);
 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/modules/windModal.js":
/*!*********************************!*\
  !*** ./js/modules/windModal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(){
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
    }

    modalClose.addEventListener('click', modalClosed);


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" || e.code === "ArrowUp") {
            modalClosed ();
        }
    });

    // Auto add modal Window
        const autoModal = setTimeout(function (){
            windowModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        },5000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_windModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/windModal */ "./js/modules/windModal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', function() {

          (0,_modules_windModal__WEBPACK_IMPORTED_MODULE_0__["default"])();
          (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
          (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_2__["default"])();
          (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])();
          (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
          (0,_modules_card__WEBPACK_IMPORTED_MODULE_5__["default"])();
          (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map