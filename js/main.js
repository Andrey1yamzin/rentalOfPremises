"use strict"
document.addEventListener("DOMContentLoaded", function(){
    let wrapBtn = document.querySelector('.conten-form_buttons');
    let btn = document.querySelectorAll('.btn');
    let tabs = document.querySelectorAll('.content-form__tabs');
    let dropdonWrap = document.querySelectorAll('.content-form_dropdown-wrapper');
    // let formReset = document.querySelector('content_form--body');
    let resetForm = document.querySelectorAll('.content_form--body');
    let wrapSearcInput = document.querySelector('.content-form_wrapper');
    let inputReset = document.querySelectorAll('#input');
    // const formRent = document.getElementById("formrent");
    // const formPurchase = document.getElementById("purchase");
    
    
    
      
    wrapSearcInput.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('input')){
            for(let i = 0; i < inputReset.length; i++){
                if(target == inputReset[i]){
                    inputReset[i].value = '';
                    break; 
                }
            }
        }
        
    })
    
    
    //табы
        function hideTabContent(hide){
            for(let i = hide; i < tabs.length; i++){
                tabs[i].classList.remove('content-form__tabs--visible');
                tabs[i].classList.add('content-form__tabs--hide');
            }}
            hideTabContent(1);
        function showTabContent(show){
            if(tabs[show].classList.contains('content-form__tabs--hide')){
                tabs[show].classList.remove('content-form__tabs--hide');
                tabs[show].classList.add('content-form__tabs--visible');
                
            }}
    
            function btnDefault(a){
                for(let i = a; i < btn.length; i++){
                    btn[i].classList.remove('btn--active');
                    btn[i].classList.add('btn--default');
                    resetForm[i].reset();
                }}
            
            
            function btnActive(b){
                if(btn[b].classList.contains('btn--default')){
                    btn[b].classList.remove('btn--default');
                    btn[b].classList.add('btn--active');
                }
            }
        wrapBtn.addEventListener('click', function(event){
                let target = event.target;
                if(target && target.classList.contains('btn')){
                    for(let i = 0; i < btn.length; i++){
                        if(target == btn[i]){
                            hideTabContent(0);
                            showTabContent(i+1);
                            btnDefault(0);
                            btnActive(i);
                            break; 
                        }
                    }
                }
                
            })
    
    
    //дропдауны
dropdonWrap.forEach((dropWrapp)=>{
            let dropdown = dropWrapp.querySelector('.content-form_dropdown-button');
            let list = dropWrapp.querySelector('.content-form_dropdown-list');
            let itemList = list.querySelectorAll('.content-form_dropdown-list_item');
            let inputList = dropWrapp.querySelector('.content-form_dropdown-list_input');
            dropdown.addEventListener('click', (e)=>{
                e.preventDefault();
                list.classList.toggle('content-form_dropdown-list--visible');
            })
            itemList.forEach((item)=>{
                item.addEventListener('click', function(){
                    if(this.innerText == 'Другое'  ){
                        dropdown.classList.toggle('content-form_dropdown-button--hide');
                        inputList.classList.toggle('content-form_dropdown-list_input--visible');
                        inputList.value = 'Введите свой вариант';
                    }else if(this.innerText == 'Оптимальная за кв.м.' || this.innerText == 'Оптимальная за объект'){
                        dropdown.classList.toggle('content-form_dropdown-button--hide');
                        inputList.classList.toggle('content-form_dropdown-list_input--visible');
                        inputList.value = 'Введите оптимальную цену';
                    }else{
                        dropdown.innerText = this.innerText;
                        inputList.value = this.innerText; 
                        list.classList.remove('content-form_dropdown-list--visible');
                    }
                    
                    console.log('Другое')
                })
            })
            document.addEventListener('click', (e)=>{
                if(e.target !== dropdown){
                    list.classList.remove('content-form_dropdown-list--visible');
                }
            })
            document.addEventListener('keydown', (e)=>{
                if(e.key === 'Tab'|| e.key === 'Escape'){
                    list.classList.remove('content-form_dropdown-list--visible');
                }
            })
        })  
        



        const formRent = document.getElementById("formrent");
        const formPurchase = document.getElementById("purchase");



        
        formRent.addEventListener('submit', formSend);
                let formReqText = document.querySelector('.content-form--text');
                async function formSend(e){
                    e.preventDefault();
        
                    let error = formValidate(formRent);


                    //отправка формы на сервер
                    let formDataOne = new FormData(formRent);

                    if (error === 0){
                        formReqText.textContent = '';
                        formRent.classList.add('_tabs--visible');
                        let responseOne = await fetch('sndmail.php',{
                            method:'POST',
                            body:formDataOne
                        });

                        if(responseOne.ok){
                            let resultRent = await responseOne.json();
                            alert(resultRent.message);
                            formRent.reset();
                            formRent.classList.remove('_tabs--visible');
                        }else{
                            alert('Ошибка!!!');
                            formRent.classList.remove('_tabs--visible');
                        }
                    }else{
                        formReqText.textContent = 'Заполните все поля!';
                    }
                }
        
                function formValidate(formRent){
                    let error = 0;
                    let formReq = document.querySelectorAll('._req'); 
                    for(let i = 0; i < formReq.length; i++){
                        const input = formReq[i];
                        formRemoveError(input);
                          
        
                        if(input.classList.contains('_email')){
                            if(emailTest(input)){
                                formAddError(input);
                                error++;
                            }
                        }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                            formAddError(input);
                            error++;  
                        }else{
                            if(input.value === ''){
                                formAddError(input);
                                error++;
                            }
                        }
                    }
                    // console.log(error);
                    return error;
                    
                };
        
                function formAddError(input){
                    input.parentElement.classList.add('_error');
                    input.classList.add('_error');
                    
        
                }
        
                function formRemoveError(input){
                    input.parentElement.classList.remove('_error');
                    input.classList.remove('_error');
                    // 
                }
                //Функция теста email
                function emailTest(input){
                    return !/^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,8})+$/.test(input.value);
                };













        formPurchase.addEventListener('submit', formSendtwo);
                let formReqTexttwo = document.querySelector('.content-form--text_two');
                async function formSendtwo(e){
                    e.preventDefault();
        
                    let errortwo = formValidatetwo(formPurchase);

                    let formDataTwo = new FormData(formPurchase);
                    if (errortwo === 0){
                        formReqTexttwo.textContent = '';
                        let responseTwo = await fetch('sndmailTwo.php',{
                            method:'POST',
                            body:formDataTwo
                        });
                        if(responseOne.ok){
                            let resultPurchase = await responseOne.json();
                            alert(resultPurchase.message);
                            formPurchase.reset();
                            formPurchase.classList.remove('_tabs--visible');
                        }else{
                                alert('Ошибка!!!');
                                formPurchase.classList.remove('_tabs--visible');
                            }
                    }else{
                        formReqTexttwo.textContent = 'Заполните все поля!';
                    }
                }
        
                function formValidatetwo(formPurchase){
                    let errortwo = 0;
                    let formReq = document.querySelectorAll('._reqtwo'); 
                    for(let i = 0; i < formReq.length; i++){
                        const inputtwo = formReq[i];
                        formRemoveError(inputtwo );
                          
        
                        if(inputtwo.classList.contains('_emailtwo')){
                            if(emailTest(inputtwo )){
                                formAddError(inputtwo);
                                errortwo++;
                            }
                        }else if(inputtwo.getAttribute("type") === "checkbox" && inputtwo.checked === false){
                            formAddError(inputtwo );
                            errortwo++;  
                        }else{
                            if(inputtwo.value === ''){
                                formAddError(inputtwo );
                                errortwo++;
                            }
                        }
                    }
                    // console.log(errortwo);
                    return errortwo;
                    
                }
        
                function formAddError(inputtwo){
                    inputtwo.parentElement.classList.add('_error');
                    inputtwo.classList.add('_error');
                    
        
                }
        
                function formRemoveError(inputtwo){
                    inputtwo.parentElement.classList.remove('_error');
                    inputtwo.classList.remove('_error');
                    // 
                }
                //Функция теста email
                function emailTest(inputtwo){
                    return !/^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,8})+$/.test(inputtwo.value);
                };

});
