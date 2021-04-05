const newTodoInput = document.getElementById('newTodoInput')
const todoList = document.getElementById('todo-list')
const form = document.getElementById('todo-form')

let savedTodo = JSON.parse(localStorage.getItem('todo')) || [];

//retrieving information from localStorage and recreating li
savedTodo.forEach((item, i) => {
    const newLi = document.createElement('li');
    const removeBtn = document.createElement('button');
    const completeBtn = document.createElement('button');

    newLi.innerText = item.task; 
    newLi.id = item.num

    if(item.isComplete === true) newLi.classList.add('completed')
 

    removeBtn.innerText = 'remove';
    removeBtn.id = 'remove';
    completeBtn.innerText = 'completed';
    completeBtn.id = 'completed'

    newLi.append(removeBtn, completeBtn);
    todoList.append(newLi);

})


form.addEventListener('submit', function(e){
    e.preventDefault();

    //requires input be made 
    if(!newTodoInput.value){
        alert('You did not enter a todo item');
        return;
    }; 

    const newLi = document.createElement('li');
    const removeBtn = document.createElement('button')
    const completeBtn = document.createElement('button');

    newLi.innerText = newTodoInput.value;
    removeBtn.innerText = 'remove';
    removeBtn.id = 'remove'
    completeBtn.innerText = 'completed'
    completeBtn.id = 'completed'

    newLi.append(removeBtn, completeBtn)
    todoList.append(newLi)

    const newPush = {task: newTodoInput.value, num:savedTodo.length + 1, isComplete: false}
    savedTodo.push(newPush)
    newLi.id = newPush.num


    localStorage.setItem('todo', JSON.stringify(savedTodo))
    form.reset();




})

todoList.addEventListener('click', function(e){
    if(e.target.id === 'remove'){
        e.target.parentElement.remove();
        const result = []
        const orderedResult = [];

        //removing the 'removed' todo item from the savedTodo array
        for(let i = 0; i < savedTodo.length; i++){
            if(savedTodo[i].num != e.target.parentElement.id){
                result.push(savedTodo[i])
            } 
        }  

        //reassigning num:values and id so that they correspond to each other
        result.forEach((value, index) => {
            orderedResult.push({task: value.task, num: index + 1, isComplete: value.isComplete})
        });
        savedTodo = orderedResult;

        const list = document.getElementsByTagName('li')
        for(let i = 0; i < list.length; i++){
            list[i].id = i + 1;
        }
     
    };
    if (e.target.id === 'completed'){
        e.target.parentElement.classList.toggle('completed');
        for(let i = 0; i < savedTodo.length; i++){
            if(savedTodo[i].num == e.target.parentElement.id){
               e.target.parentElement.classList == 'completed' ? savedTodo[i].isComplete = true: savedTodo[i].isComplete = false; 
            };
        }
    }

    localStorage.setItem('todo', JSON.stringify(savedTodo))
    
})