let wrapBtn = document.querySelector('.conten-form_buttons');
let btn = document.querySelectorAll('.btn');
let tabs = document.querySelectorAll('.content-form__tabs');
let dropdonWrap = document.querySelectorAll('.content-form_dropdown-wrapper');

  




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
    wrapBtn.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('btn')){
                for(let i = 0; i < btn.length; i++){
                    if(target == btn[i]){
                        hideTabContent(0);
                        showTabContent(i+1);
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
        dropdown.addEventListener('click', (e)=>{
            e.preventDefault();
            list.classList.toggle('content-form_dropdown-list--visible');
        })
        itemList.forEach((item)=>{
            item.addEventListener('click', function(){
                dropdown.innerText = this.innerText;
                inputList.value = this.innerText; 
                list.classList.remove('content-form_dropdown-list--visible');
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
 
    