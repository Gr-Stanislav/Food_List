function forms(){
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

module.exports = forms;