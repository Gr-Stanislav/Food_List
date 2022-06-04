window.addEventListener('DOMContentLoaded', function() {
   
    const windModal = require('./modules/windModal'),
          timer = require('./modules/timer'),
          tabs = require('./modules/tabs'),
          slider = require('./modules/slider'),
          forms = require('./modules/forms'),
          card = require('./modules/card'),
          calc = require('./modules/calc');

          windModal();
          timer();
          tabs();
          slider();
          forms();
          card();
          calc();

});