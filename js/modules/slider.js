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

export default slider;