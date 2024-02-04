


let tasks = [
    {
        id:1,
        text:'Купить книгу',
        isImportant: true,
        isDone:false
    },
    {
        id:2,
        text:'Купить хлеб',
        isImportant: false,
        isDone:true
    }
]

let todoList = document.querySelector('.todo__list')
let todoForm = document.querySelector('.todo__form')
let todoField  =document.querySelector('.todo__field')
let todoError  =document.querySelector('.todo__error')
let todoDone = document.querySelector('.todo__lvl-done')
let todoAll = document.querySelector('.todo__lvl-all')







const addItemInTodoList = () => {
    todoList.innerHTML = ''

    tasks.forEach((item) => {
        todoList.innerHTML += `     <li class="todo__item" 
     style="background: ${item.isDone ? 'green' : item.isImportant ? 'gold' : 'royalblue'}; 
     order: ${item.isDone ? '-2' : item.isImportant ? '-1' : '0' };">
                
                
                <div class="todo__item-left">
                <input  data-id ="${item.id}" ${item.isDone ? 'checked' : ''} class="todo__item-done" type="checkbox">
                 <p class="todo__item-text" style="text-decoration: ${item.isDone ? 'line-through' : 'none'}">${item.text} </p>
                 </div>
                
               
                <div class="todo__item-right">
                        <span data-id ="${item.id}" class="todo__item-imp">
                    <svg class="todo__svg" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 488.134"><path fill="black" fill-rule="nonzero" d="M267.754 7.907l63.958 156.311 168.458 12.525c7.011.494 12.291 6.579 11.798 13.589a12.688 12.688 0 01-4.829 9.108L378.561 308.322l40.151 164.121c1.647 6.818-2.543 13.686-9.36 15.333-3.552.857-7.117.13-9.951-1.727l-143.396-88.714-143.69 88.897c-5.965 3.682-13.792 1.833-17.474-4.132a12.66 12.66 0 01-1.536-9.655l40.142-164.123L4.501 199.144c-5.36-4.535-6.027-12.561-1.492-17.922a12.679 12.679 0 018.811-4.469l168.472-12.535L244.255 7.907c2.64-6.487 10.042-9.608 16.53-6.969a12.651 12.651 0 016.969 6.969z"/><path fill="#FFCB47" d="M256.004 12.688l66.958 163.641 176.313 13.108L364.35 303.691l42.015 171.738-150.361-93.025-150.36 93.025 42.014-171.738L12.716 189.437l176.327-13.111z"/><path fill="#FFD88A" d="M188.75 173.126L255.299 7.779v251.109L11.738 188.907z"/>
        <path fill="black" d="M254.042 383.37l-146.917 89.735 146.038-221.699L406.24 474.863z"/><path fill="white" d="M265.938 148.38l28.98 70.821 76.336 5.674c5.257.371 9.219 4.934 8.848 10.191a9.521 9.521 0 01-3.624 6.832l-58.165 49.254 18.199 74.384c1.235 5.112-1.907 10.263-7.02 11.498a9.5 9.5 0 01-7.453-1.288l-64.912-40.158-65.119 40.288c-4.472 2.762-10.343 1.375-13.105-3.097a9.487 9.487 0 01-1.151-7.241l18.191-74.386-58.439-49.478c-4.019-3.4-4.52-9.421-1.12-13.44a9.507 9.507 0 016.608-3.35l76.346-5.685 28.977-70.819c1.977-4.865 7.531-7.205 12.395-5.228a9.484 9.484 0 015.228 5.228z"/><path fill="${item.isImportant ? 'black' : 'white'}" d="M257.128 151.963l31.228 76.319 82.228 6.113-62.926 53.285 19.594 80.094-70.124-43.385-70.124 43.385 19.594-80.094-62.933-53.285 82.234-6.115z"/></svg>
</span>
                        <span data-id ="${item.id}" class="todo__item-del">X</span>
                </div>
         
            </li>`
    })

    todoAll.textContent = tasks.length
    todoDone.textContent = tasks.filter(el => el.isDone).length

    let todoItemDelItems = document.querySelectorAll('.todo__item-del')

    Array.from(todoItemDelItems).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.filter(el => el.id != item.dataset.id)

            addItemInTodoList()
        })
    })

    let todoItemImpItems = document.querySelectorAll('.todo__item-imp')

    Array.from(todoItemImpItems).forEach((item) => {
        item.addEventListener('click', () => {
            tasks = tasks.map((el) => {
                if(el.id == item.dataset.id){
                    return {...el, isImportant : !el.isImportant}
                }
                return el
            })
            addItemInTodoList()
        })
    })

    let todoItemDoneItems = document.querySelectorAll('.todo__item-done')

    Array.from(todoItemDoneItems).forEach((item) => {
        item.addEventListener('change' , () => {
            tasks = tasks.map((el) => {
                if(el.id === +item.dataset.id){
                    return {... el, isDone: !el.isDone}
                }
                return el
            })
            addItemInTodoList()
        })
    })

    let todoItemBtn = document.querySelector('.todo__del-all')

    todoItemBtn.addEventListener('click' ,() => {
        tasks = tasks.filter((el) => {
            return !el.isDone
        })
        addItemInTodoList()
    })
}



addItemInTodoList()

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()

   if( tasks.some(item => item.text.toUpperCase() === event.target[0].value.toUpperCase())){
       alert('Нельзя добавить')
   }else {
       tasks = [...tasks, {
           id: tasks.length ?tasks.at(-1).id + 1: 1,
           text: event.target[0].value,
           isImportant: false,
           isDone:false
       }]

       addItemInTodoList()

       event.target[0].value = ""
   }

})


todoField.addEventListener('input', (event) => {
    if(tasks.some(item => item.text.toUpperCase() === event.target.value.toUpperCase())){
        todoError.style.display = 'block'
    }else {
        todoError.style.display = 'none'
    }
})

