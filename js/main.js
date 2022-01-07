let wrapBtn = document.querySelector('.conten-form_buttons');
let btn = document.querySelectorAll('.btn');
let tabs = document.querySelectorAll('.content-form__tabs');
let dropdonWrap = document.querySelectorAll('.content-form_dropdown-wrapper');
let formReset = document.querySelector('content_form--body');
let resetForm = document.querySelectorAll('.content_form--body');
let wrapSearcInput = document.querySelector('.content-form_wrapper');
let inputReset = document.querySelectorAll('#input');



  
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
 
    