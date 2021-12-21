window.addEventListener('load', function(){
    let dropdonWrap = document.querySelectorAll('.content-form_dropdown-wrapper');
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
})