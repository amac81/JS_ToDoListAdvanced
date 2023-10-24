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
const emptyListElem = document.querySelector("#empty-list");
const toolBar = document.querySelector("#toolbar");


//global variables
let oldToDoText;

// Functions
const addToDoToList = (text, done = false, save = true) => {
      
    emptyListElem.classList.add("hide");   
    toolBar.classList.remove("hide");   

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

    // Local Storage data
    if(done) {
        toDoItemDiv.classList.add("done")
    }
    
    if(save) {
        addToDoToListLocalStorage({text: text, done: done})
        //or addToDoToListLocalStorage({text, done})
    }

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
        if(todoText.innerText === oldToDoText){
            todoText.innerText = text;
            updateToDoTextLocalStorage(oldToDoText, text);
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

const loadFromLocalStorage  = ()=> {
    const allToDos = getAllToDosFromLocalStorage();

    allToDos.forEach((toDo) => {
        addToDoToList(toDo.text, toDo.done, false);
    });
};

const deleteToDoFromLocalStorage  = (todoText)=> {
    const allToDos = getAllToDosFromLocalStorage();
    
    //filteredToDos have all ToDo's that the text doesn't match with todoText
    const filteredToDos = allToDos.filter((toDo) => toDo.text !== todoText);
    
    //replace local storage key allToDos with the content of filteredToDos
    localStorage.setItem("allToDos", JSON.stringify(filteredToDos));

    if(filteredToDos.length === 0){
        emptyListElem.classList.remove("hide");
        toolBar.classList.add("hide");   
    }

 };

 const updateToDoStatusLocalStorage  = (toDoText)=> {
    const allToDos = getAllToDosFromLocalStorage();
    
    //map does not return data, it changes the original data
    allToDos.map((toDo) => toDo.text === toDoText 
        ? (toDo.done = !toDo.done) 
        : null
    );
    
    //replace local storage key allToDos with the content of filteredToDos
    localStorage.setItem("allToDos", JSON.stringify(allToDos));
   
 };

 const updateToDoTextLocalStorage  = (oldText, newText)=> {
    const allToDos = getAllToDosFromLocalStorage();

    //map does not return data, it changes the original data
    allToDos.map((toDo) => toDo.text === oldText
        ? (toDo.text = newText) 
        : null
    );
    
    //replace local storage key allToDos with the content of filteredToDos
    localStorage.setItem("allToDos", JSON.stringify(allToDos));
   
 };


// Events

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    
    if(inputValue){
        //save ToDo
       addToDoToList(inputValue);
    }
});


//ToDo item buttons click event
document.addEventListener("click", (elem) => {
    const targetElement = elem.target;
    const parentElement = targetElement.closest("div");
    let currentToDoText;
    
    if(parentElement && parentElement.querySelector("h3")){
        currentToDoText = parentElement.querySelector("h3").innerText;
    }

    //finish ToDo
    if(targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
        updateToDoStatusLocalStorage(currentToDoText);
    }
    
    //edit ToDo
    if(targetElement.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = currentToDoText;
        oldToDoText = currentToDoText;        
    }

    //delete ToDo
    if(targetElement.classList.contains("delete-todo")) {
        parentElement.remove();
        deleteToDoFromLocalStorage(currentToDoText);
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

// Local Storage
const getAllToDosFromLocalStorage = () => {
    const allToDos = JSON.parse(localStorage.getItem("allToDos") ) || [];
    return allToDos;
}

const addToDoToListLocalStorage = (toDo) => {
    const allToDos = getAllToDosFromLocalStorage();
    allToDos.push(toDo);
    
    localStorage.setItem("allToDos", JSON.stringify(allToDos));
};

// Inicialization
loadFromLocalStorage();