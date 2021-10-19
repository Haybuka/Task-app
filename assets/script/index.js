let taskmode = [...document.querySelectorAll('.task-mode p')];
let addTask = document.querySelector('.add-task');
let form = document.querySelector('form')
let pendingUl= document.querySelector('.pending')
let formInputs = [...document.querySelectorAll('form input')]
let dateSpan = document.querySelector('.date-here');

//to handle date time display
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];

//to toggle task mode
function toggleView(taskStatus) {
    let display = [...document.querySelectorAll('.display-task ul')];
    let x = display.find( statusMode =>  statusMode.className.includes(taskStatus));
    let xy = display.find( statusMode =>  !statusMode.className.includes(taskStatus));
    x.classList.remove('task-view-active')
    xy.classList.add('task-view-active')  
}

//initialize date and time
function dateTime(dateSpan){
    let date = new Date();
    let dayOfWeek = days[date.getDay()];
    let dateNum = date.getDate();
    let month = months[date.getMonth()];
    dateSpan.innerHTML = `${dayOfWeek}, ${dateNum} ${month}.`
    date.getDay();
}


 dateTime(dateSpan);
//toggle the page for complete or pending
taskmode.forEach(task=>{
    task.addEventListener('click',function(){
        if(!this.className.includes('mode-active')){
            document.querySelector('p.mode-active').classList.toggle('mode-active')
            this.className = 'mode-active';
        }
        toggleView(this.id);
   })
})

//handle new entries
form.addEventListener('submit',function(e){
   e.preventDefault(); 
    let pendingUl = document.querySelector('.pending')
    const title = this[0].value;
    const description = this[1].value;
    const getTime = new Date();
    const time = `${getTime.getHours()} : ${getTime.getMinutes()}`
    let listItems = [...document.querySelectorAll('.pending li')];

    //check for empty title
    if(!(title == '' && description == '')){
        //check for duplicated entries 
        //before rendering the new element
            let duplicateItem = listItems.filter( li=>  li.lastElementChild.innerHTML.includes(description));
            if(duplicateItem.length>=1){
                form.querySelector('span').innerHTML ='This Task, or Title Already Exists'
            }else{
                let createdLi = createElement(title,description,time);
                pendingUl.append(createdLi)
                let allInput = [...document.querySelectorAll('form input')];
            
                allInput.forEach(input =>{
                    input.id == 'Title' ? 
                    input.previousElementSibling.innerHTML = input.previousElementSibling.htmlFor : ''
                
                    input.value =''
                })
            }
    } else{
        form.querySelector('span').innerHTML ='Entries can not be blank'
    }
    

})

//toggle form using + SIGN
addTask.addEventListener('click',function(){
    form.classList.toggle('active');
    this.classList.toggle('view')
})

// making the label dynamic with title text
formInputs.forEach(input =>{
    input.addEventListener('change',function(){
        let inputText = this.value.toString().length;
        let initialInput = this.value.toString();
        let label = this.previousElementSibling;
        const labelText = this.previousElementSibling.innerHTML;
         form.querySelector('span').innerHTML =''
         //tenary conditional for text render
        inputText <= 2 || labelText == 'Description' ? 
          label.innerHTML = label.htmlFor 
          :  label.innerHTML+=` - ${this.value}`  
    })
})

//create the elements for the pending input
function createElement(title,description,time){
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const p = document.createElement('p');
    p.innerHTML = description;
    input.setAttribute('id',`${title}`);
    li.setAttribute('id',`${title}`);
    input.setAttribute('type','checkbox')
    label.setAttribute('for',`${title}`);
    li.append(label,input,p);
    return li;
}



//handling completed & Pending using event delegation

pendingUl.addEventListener('click',function(e){
    let li = e.target.parentElement;
    
    let liWithId = li.id;
    let checkbox = li.querySelector('input[type="checkbox"]');
    
    if(checkbox.checked){
        // let checkbox = li.querySelector('input[type="checkbox"]');
        let pText = li.querySelector('p').innerHTML;
        createComplete(pText);
        li.remove()
    }
})

//Create entries for completed mode
function createComplete(text){
   let ulComplete = document.querySelector('.completed')
   let pTag = document.createElement('p');
   let li = document.createElement('li');
   let img = document.createElement('img');
   img.setAttribute('src','/assets/img/delete-icon.png');
   pTag.innerHTML=text;
   li.append(pTag,img);
   ulComplete.append(li)
}