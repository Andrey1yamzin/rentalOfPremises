"use strict"
document.addEventListener("DOMContentLoaded", function(){

    // let messContent = document.querySelector('.message');
    // function sayHi() {
    //     messContent.style.display = 'flex';
    //     let closeMess = document.querySelector('.message--btn');
    //     closeMess.addEventListener('click', function(){
    //         messContent.style.display = 'none'; 
    //     })
    //   };
    //   setTimeout(sayHi, 1000);



    let wrapBtn = document.querySelector('.conten-form_buttons');
    let btn = document.querySelectorAll('.btn');
    let tabs = document.querySelectorAll('.content-form__tabs');
    let dropdonWrap = document.querySelectorAll('.content-form_dropdown-wrapper');

    let resetForm = document.querySelectorAll('.content_form--body');
    let wrapSearcInput = document.querySelector('.content-form_wrapper');
    let inputReset = document.querySelectorAll('#input');


    let infoTable = document.querySelector('.inform-table');
    let infoText = document.querySelector('.inform-table--title');
    let infoBtn = document.querySelector('.inform-btn');
    

    let infoTablePur = document.querySelector('.inform-table--Two');
    let infoTextPur = document.querySelector('.inform-table--title_Two');
    let infoBtnTwo = document.querySelector('.inform-btnTwo');
    
    
    
      
    wrapSearcInput.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('input')){
            for(let i = 0; i < inputReset.length; i++){
                if(target == inputReset[i]){
                    inputReset[i].contentEditable = "true";
                    break; 
                }
            }
        }
        
    })
    
    
    
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
    
    

    
dropdonWrap.forEach((dropWrapp)=>{
            let dropdown = dropWrapp.querySelector('.content-form_dropdown-button');
            let list = dropWrapp.querySelector('.content-form_dropdown-list');
            let itemList = list.querySelectorAll('.content-form_dropdown-list_item');
            let inputList = dropWrapp.querySelector('.content-form_dropdown-list_input');
            let closeInput = dropWrapp.querySelector('.content-form_dropdown--close_block');
            dropdown.addEventListener('click', (e)=>{
                e.preventDefault();
                list.classList.add('content-form_dropdown-list--visible');
            })
            dropWrapp.addEventListener('click', (e)=>{              
                    if(e.target.classList.contains("content-form_dropdown--close_block") || e.target.classList.contains("content-form_dropdown--close_item")){
                        closeInput.classList.add('_hide-block');
                        closeInput.classList.remove('_visible-block');
                        dropdown.classList.remove('content-form_dropdown-button--hide');
                        inputList.classList.remove('content-form_dropdown-list_input--visible');
                    }
            })
            itemList.forEach((item)=>{
                item.addEventListener('click', function(){
                    if(this.innerText == 'Другое'  ){

                        dropdown.classList.add('content-form_dropdown-button--hide');
                        inputList.classList.add('content-form_dropdown-list_input--visible');
                        closeInput.classList.remove('_hide-block');
                        closeInput.classList.add('_visible-block');
                        inputList.setAttribute('placeholder', "Введите свой вариант");

                    }else if(this.innerText == 'Оптимальная за кв.м.' || this.innerText == 'Оптимальная за объект'){
                        dropdown.classList.add('content-form_dropdown-button--hide');
                        inputList.classList.add('content-form_dropdown-list_input--visible');
                        closeInput.classList.remove('_hide-block');
                        closeInput.classList.add('_visible-block');
                        inputList.setAttribute('placeholder', "Введите оптимальную цену");
                    }else{
                        dropdown.innerText = this.innerText;
                        inputList.value = this.innerText; 
                        list.classList.remove('content-form_dropdown-list--visible');
                    }
                    

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
        



        
        formRent.addEventListener('submit', formSend);
                let formReqText = document.querySelector('.content-form--text');
                async function formSend(e){
                    e.preventDefault();
        
                    let error = formValidate(formRent);



                    let formDataOne = new FormData(formRent);

                    if (error === 0){
                        formReqText.textContent = '';
                        formRent.classList.add('_tabs--visible');
                        infoTable.classList.add('_table--visible');


                        let responseOne = await fetch('sndmail.php',{
                            method:'POST',
                            body:formDataOne
                        });

                        if(responseOne.ok){
                            let resultRent = await responseOne.json();
                            infoText.textContent = resultRent.message;
                            formRent.reset();
                            infoBtn.addEventListener('click', function(){
                                pageReload();
                            });
                            
                        }else{
                            errorReload();
                            alert('ошибка!');
                            
                        }
                    }else{
                        formReqText.textContent = 'Заполните все поля!';
                    }
                }
        
                function formValidate(formRent){
                   
                    let error = 0;
                    error = checkbx();//присваивается если чекбокс возвратил 3 или 0



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
                    return error;
                };
                
//проверка в первом табе нажаты ли чекбоксы
                function checkbx(){
                    let error = 0;
                      let formCheck = document.querySelectorAll('._check');
                      let checkpremises = document.querySelectorAll('._checpremises');
                      let checkarea = document.querySelectorAll('._checkarea');
                      let checksize = document.querySelectorAll('._checksize');
                                            //добавление красного квадрата 
                                            function validation(){
                                                formCheck.forEach(function(el){
                                                    formAddError(el);
                                                    console.log(el)
                                                    error++;
                                        })}
                                            //удаление красного квадрата
                                        function validationpassed(){
                                            formCheck.forEach(function(el){
                                                formRemoveError(el);
                                    })}
                                    //добавление красного квадрата 
                                            function validationPomises(){
                                                checkpremises.forEach(function(el){
                                                    formAddError(el);
                                                    error++;
                                        })}
                                         //удаление красного квадрата
                                        function validationPomisesPassed(){
                                            checkpremises.forEach(function(el){
                                                formRemoveError(el);
                                    })}

                                            //добавление красного квадрата 
                                            function validationArrayArea(){
                                                        checkarea.forEach(function(el){
                                                            formAddError(el);
                                                            error++;
                                        })}
                                            //удаление красного квадрата
                                        function validationArrayAreaPassed(){
                                            checkarea.forEach(function(el){
                                                formRemoveError(el);
                                    })}

                                            //добавление красного квадрата 
                                            function validationSize(){
                                                checksize.forEach(function(el){
                                                    formAddError(el);
                                                    error++;
                                        })}
                                            //удаление красного квадрата
                                        function validationSizePassed(){
                                            checksize.forEach(function(el){
                                                formRemoveError(el);
                                    })}
                        
                        //берутся чекбоксы и если с  checkboxValidation возвратил false то загарается красным
          


                function checkboxValidation(element){
                            return element.checked === true;
                    }
                let prop =[...formCheck];
                let propPromises = [...checkpremises];
                let propArea = [...checkarea];
                let propSize = [...checksize]
//выше мы полученные коллецкции засовываем в массив и ниже проверяем усть там нажатые чебоксы
                let validateArray = prop.some(checkboxValidation);
                let validateArrayPromises = propPromises.some(checkboxValidation);
                let validateArrayArea = propArea.some(checkboxValidation);
                let validateSize = propSize.some(checkboxValidation);
                
                startValidate();
                function startValidate(){
                    startValidateArray();
                    startValidatePromises();
                    startValidateArrayArea();
                    startValidateSize();
                };
                    function startValidateArray(){
                        if(validateArray === false){
                            validation();
                        }else if(validateArray === true){
                            validationpassed();
                        }
                    };
                    function startValidatePromises(){
                        if(validateArrayPromises === false){
                            validationPomises();
                        }else if(validateArrayPromises === true){
                            validationPomisesPassed();
                        }
                    };
                    function startValidateArrayArea(){
                        if(validateArrayArea === false){
                            validationArrayArea();
                        }else if(validateArrayArea === true){
                            validationArrayAreaPassed();
                        }
                    };
                    function startValidateSize(){
                        if(validateSize === false){
                            validationSize();
                        }else if(validateSize === true){
                            validationSizePassed();
                        }
                    };

                 

                return error;
            }




                function formAddError(input){
                    input.parentElement.classList.add('_error');
                    input.classList.add('_error');
                }
        
                function formRemoveError(input){
                    input.parentElement.classList.remove('_error');
                    input.classList.remove('_error');
                    
                }

                function emailTest(input){
                    return !/^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,8})+$/.test(input.value);
                };

                function errorReload(){
                    infoTable.classList.remove('_table--visible');
                    formRent.classList.remove('_tabs--visible');
                }
                function pageReload(){
                    formRent.classList.remove('_tabs--visible');
                    infoTable.classList.remove('_table--visible');
                    window.location.reload();
                }

                






                                                                                    //таб 2 


const formPurchase = document.getElementById("purchase");


    formPurchase.addEventListener('submit', formSendtwo);
                let formReqTexttwo = document.querySelector('.content-form--text_two');
                async function formSendtwo(e){
                    e.preventDefault();
        
                    let errortwo = formValidatetwo(formPurchase);

                    let formDataTwo = new FormData(formPurchase);
                    if (errortwo === 0){
                        formReqTexttwo.textContent = '';
                        formPurchase.classList.add('_tabs--visible');
                        infoTablePur.classList.add('_table--visible');
                        let responseTwo = await fetch('sndmailTwo.php',{
                            method:'POST',
                            body:formDataTwo
                        });
                        if(responseTwo.ok){
                            let resultPurchase = await responseTwo.json();
                            infoTextPur.textContent = resultPurchase.message;
                            formPurchase.reset();
                            infoBtnTwo.addEventListener('click', function(){
                                pageReloadPurchase();
                            });
                        }else{
                            errorReloadPurchase();
                            alert('ошибка!');
                            }
                    }else{
                        formReqTexttwo.textContent = 'Заполните все поля!';
                    }
                }
        
                function formValidatetwo(formPurchase){
                    let errortwo = 0;
                    errortwo = checkbxtwo();

                    let formReq = document.querySelectorAll('._reqtwo'); 
                    for(let i = 0; i < formReq.length; i++){
                        const inputtwo = formReq[i];
                        formRemoveErrortwo(inputtwo);
                          
        
                        if(inputtwo.classList.contains('_emailtwo')){
                            if(emailTest(inputtwo )){
                                formAddErrortwo(inputtwo);
                                errortwo++;
                            }
                        }else if(inputtwo.getAttribute("type") === "checkbox" && inputtwo.checked === false){
                            formAddErrortwo(inputtwo );
                            errortwo++;  
                        }else{
                            if(inputtwo.value === ''){
                                formAddErrortwo(inputtwo );
                                errortwo++;
                            }
                        }
                    }
                    return errortwo;
                    
                }

                function checkbxtwo(){
                    let errortwo = 0;
                      let formChecktwo = document.querySelectorAll('._checktwo');
                      let checkpremisestwo = document.querySelectorAll('._checpremisestwo');
                      let checkareatwo = document.querySelectorAll('._checkareatwo');
                      let checksizetwo = document.querySelectorAll('._checksizetwo');
                                            //добавление красного квадрата 
                                            function validation(){
                                                formChecktwo.forEach(function(el){
                                                    formAddErrortwo(el);
                                                    console.log(el)
                                                    errortwo++;
                                        })}
                                            //удаление красного квадрата
                                        function validationpassed(){
                                            formChecktwo.forEach(function(el){
                                                formRemoveErrortwo(el);
                                    })}
                                    //добавление красного квадрата 
                                            function validationPomises(){
                                                checkpremisestwo.forEach(function(el){
                                                    formAddErrortwo(el);
                                                    errortwo++;
                                        })}
                                         //удаление красного квадрата
                                        function validationPomisesPassed(){
                                            checkpremisestwo.forEach(function(el){
                                                formRemoveErrortwo(el);
                                    })}

                                            //добавление красного квадрата 
                                            function validationArrayArea(){
                                                        checkareatwo.forEach(function(el){
                                                            formAddErrortwo(el);
                                                            errortwo++;
                                        })}
                                            //удаление красного квадрата
                                        function validationArrayAreaPassed(){
                                            checkareatwo.forEach(function(el){
                                                formRemoveErrortwo(el);
                                    })}

                                            //добавление красного квадрата 
                                            function validationSize(){
                                                checksizetwo.forEach(function(el){
                                                    formAddErrortwo(el);
                                                    errortwo++;
                                        })}
                                            //удаление красного квадрата
                                        function validationSizePassed(){
                                            checksizetwo.forEach(function(el){
                                                formRemoveErrortwo(el);
                                    })}
                        
                        //берутся чекбоксы и если с  checkboxValidation возвратил false то загарается красным
          


                function checkboxValidation(element){
                            return element.checked === true;
                    }
                let proptwo =[...formChecktwo];
                let propPromisestwo = [...checkpremisestwo];
                let propAreatwo = [...checkareatwo];
                let propSizetwo = [...checksizetwo]
//выше мы полученные коллецкции засовываем в массив и ниже проверяем усть там нажатые чебоксы
                let validateArray = proptwo.some(checkboxValidation);
                let validateArrayPromises = propPromisestwo.some(checkboxValidation);
                let validateArrayArea = propAreatwo.some(checkboxValidation);
                let validateSize = propSizetwo.some(checkboxValidation);
                
                startValidate();
                function startValidate(){
                    startValidateArray();
                    startValidatePromises();
                    startValidateArrayArea();
                    startValidateSize();
                };
                    function startValidateArray(){
                        if(validateArray === false){
                            validation();
                        }else if(validateArray === true){
                            validationpassed();
                        }
                    };
                    function startValidatePromises(){
                        if(validateArrayPromises === false){
                            validationPomises();
                        }else if(validateArrayPromises === true){
                            validationPomisesPassed();
                        }
                    };
                    function startValidateArrayArea(){
                        if(validateArrayArea === false){
                            validationArrayArea();
                        }else if(validateArrayArea === true){
                            validationArrayAreaPassed();
                        }
                    };
                    function startValidateSize(){
                        if(validateSize === false){
                            validationSize();
                        }else if(validateSize === true){
                            validationSizePassed();
                        }
                    };
                return errortwo;
            }












        
                function formAddErrortwo(inputtwo){
                    inputtwo.parentElement.classList.add('_error');
                    inputtwo.classList.add('_error');
                    
        
                }
        
                function formRemoveErrortwo(inputtwo){
                    inputtwo.parentElement.classList.remove('_error');
                    inputtwo.classList.remove('_error');
                    
                }
                function emailTest(inputtwo){
                    return !/^\w+([\.-]?\w+)*@\w+([\.-]\w+)*(\.\w{2,8})+$/.test(inputtwo.value);
                };




                function errorReloadPurchase(){
                    infoTablePur.classList.remove('_table--visible');
                    formRent.classList.remove('_tabs--visible');
                }
                function pageReloadPurchase(){
                    formRent.classList.remove('_tabs--visible');
                    infoTablePur.classList.remove('_table--visible');
                    window.location.reload();
                }

});
