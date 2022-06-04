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

module.exports = modal;