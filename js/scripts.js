// Element selection
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

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

    //by default the task isn't done
    toDoItemDiv.classList.add("todo");

    todoList.appendChild(toDoItemDiv);
    todoInput.value = "";
    todoInput.focus();
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
