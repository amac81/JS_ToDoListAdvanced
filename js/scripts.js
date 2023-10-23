// Element selection
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

//global variables
let oldInputValue;

// Functions
const saveToDo = (text) => {
    const toDoItemDiv = document.createElement("div");
    toDoItemDiv.classList.add("todo-item");
    const todoTitle = document.createElement("h3");
    
    const btnFinish = document.createElement("button");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");
  
    todoTitle.innerText = text;
    toDoItemDiv.appendChild(todoTitle);

    btnFinish.classList.add("finish-todo");
    btnFinish.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDoItemDiv.appendChild(btnFinish);

    btnEdit.classList.add("edit-todo");
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDoItemDiv.appendChild(btnEdit);

    btnDelete.classList.add("delete-todo");
    btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    toDoItemDiv.appendChild(btnDelete);    

    todoList.appendChild(toDoItemDiv);
    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateToDo = (text) => {
    const allToDos = document.querySelectorAll(".todo-item");
    
    allToDos.forEach((toDo) => {
        let todoText = toDo.querySelector("h3");
        if(todoText.innerText === oldInputValue){
            todoText.innerText = text;
        }        
    });
}


const searchAndShow = (textToSearch) => {
    const allToDos = document.querySelectorAll(".todo-item");
    const normalizedText = textToSearch.toLowerCase();
    
    allToDos.forEach((toDo) => {
        let todoText = toDo.querySelector("h3").innerText.toLowerCase();
        
        toDo.style.display = "flex";
        
        if(!todoText.includes(normalizedText)){
            toDo.style.display = "none";
        }        
    });
}

const filterToDos = (filterValue) => {
    const allToDos = document.querySelectorAll(".todo-item");
    switch(filterValue) {
        case "all": {
            allToDos.forEach((todo) => todo.style.display = "flex");
            break;
        }
        case "done": {
            allToDos.forEach((todo) => 
                todo.classList.contains("done")
                ? (todo.style.display = "flex")
                : (todo.style.display = "none")
            );
            break;
        }
        case "todo": {
            allToDos.forEach((todo) => 
                !todo.classList.contains("done")
                ? (todo.style.display = "flex")
                : (todo.style.display = "none")
            );
            break;
        }
        default: break;
    }
}

// Events

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    
    if(inputValue){
        //save ToDo
       saveToDo(inputValue);
    }
});


//buttons click event
document.addEventListener("click", (elem) => {
    const targetElement = elem.target;
    const parentElement = targetElement.closest("div");
    let todoText;
    
    if(parentElement && parentElement.querySelector("h3")){
        todoText = parentElement.querySelector("h3").innerText;
    }

    //finish ToDo
    if(targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
    }
    
    //edit ToDo
    if(targetElement.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoText;
        oldInputValue = todoText;
    }

    //delete ToDo
    if(targetElement.classList.contains("delete-todo")) {
        parentElement.remove();
    }

});

cancelEditBtn.addEventListener("click", (elem)=> {
    elem.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (elem)=> {
    elem.preventDefault();
    
    const editInputValue = editInput.value;

    if(editInputValue){
        updateToDo(editInputValue);       
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e)=> {
    const searchText = e.target.value;
    searchAndShow(searchText);    
});

eraseBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    searchInput.value = "";

    //to show again all ToDos
    searchInput.dispatchEvent(new Event("keyup"));   
});


filterBtn.addEventListener("change", (e)=> {
    const filterValue = e.target.value;
    filterToDos(filterValue);    
});