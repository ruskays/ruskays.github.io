

"use strict"

document.addEventListener('DOMContentLoaded', function() {

    function formSet(formID) {
        let form = document.getElementById(formID);
        form.addEventListener('submit', formSend);

        async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);

            let formData = new FormData(form);
            if (error === 0) {
                form.classList.add('_sending');
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });

                if(response.ok) {
                    
                    let result = await response.json();
                    alert(result.message);
                    formPreview.innerHTML = '';
                    form.reset();
                    form.classList.remove('_sending');
                } else {
                    alert('ошибка')
                }
            } else {
                // alert('Заполните обязательные поля');
                form.classList.remove('_sending');
            }
        }
        //маска телефона
        let phoneInp = document.getElementById('formTel');
        // const phoneMask = IMask(phoneInp, {
        //     mask: '+{7}(000)000-00-00',
        // });
        function formValidate(form) {
            
            let error = 0;
            let formReg = form.querySelectorAll('._reg');
            let password = form.querySelector('._password');
            let passwordCheck = form.querySelector('._password-check');
            
            for (let index = 0; index < formReg.length; index++) {
                const input = formReg[index];
                formRemoveError(input);
                //проверка мейла
                if(input.classList.contains('_email')) {
                    if(emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (input.getAttribute("type") === "checkox" && input.checked === false) {
                    formAddError(input);
                    error++;
                } else if (password !== null && input === password && password.value.length < 6) {
                    formAddError(input);
                    error++;

                } else if (input === passwordCheck && passwordCheck !== null && password.value !== passwordCheck.value) {
                    formAddError(input);
                    error++;
                }
                else if (input === passwordCheck && password.value.length < 6) {
                    formAddError(input);
                    error++;
                }
                 else {
                    
                    if(input.value === '') {
                        formAddError(input);
                        error++;
                    } else {
                        showSucces(input);
                    }
                }
            } 
            
            return error
        }
        //обработка ошибок
        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }

        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
           
        }
        //показать если поле заполнено правильно
        function showSucces(input) {
            input.parentElement.classList.add('_succes');
        }

        

        //функция проверки email
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
        }
        //показать пароль
        function showPass() {

          let btnsShowPass = form.querySelectorAll('.form-showPass');
          let password = form.querySelector('._password');
          btnsShowPass.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (password.value.trim()  && password.type === "password") {
                    password.type = "text";
                  } else {
                    password.type = "password";
                  }
            })
          })
        }
        showPass();

    }
    formSet('form');

      

}) 