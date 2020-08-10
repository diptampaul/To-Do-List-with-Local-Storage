const taskInput = document.getElementById('task')
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const filter = document.getElementById('filter')
const clearBtn = document.querySelector('.clear-tasks')


//event listeners
document.addEventListener('DOMContentLoaded',getTasks)
form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearTask);
taskList.addEventListener('click',removeTask);
filter.addEventListener('keyup', filterTask);


//These are all functions
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        const li = document.createElement('li')
        li.className = 'collection-item'
    
        li.appendChild(document.createTextNode(task))
    
        //Creating Link Tag
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = "<i class='fa fa-remove'></i>"
    
        li.appendChild(link)
    
        //appending li to ul
        taskList.appendChild(li)
    })
}


function addTask(e){

    if(taskInput.value == ''){
        alert('Add a Task!')
    }else{
        const li = document.createElement('li')
        li.className = 'collection-item'
    
        li.appendChild(document.createTextNode(taskInput.value))
    
        //Creating Link Tag
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = "<i class='fa fa-remove'></i>"
    
        li.appendChild(link)
    
        //appending li to ul
        taskList.appendChild(li)

        storeTasksinLS(taskInput.value)
    
        //clear taskinput section'
        taskInput.value = ''
    }


    e.preventDefault();
}


function clearTask(){
    taskList.innerHTML = ''

    clearTaskFromLS()
}

function clearTaskFromLS(){
    localStorage.clear()
}


function removeTask(e){
    // console.log(e.target)

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove()
        }

        removeTaskFromLS(e.target.parentElement.parentElement)
    }
}

function removeTaskFromLS(taskElem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(task === taskElem.textContent){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function filterTask(e){
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })
}

function storeTasksinLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}