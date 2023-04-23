const url = "http://localhost:3000/todos";
const todoUl = document.querySelector("#todo-list");
const form = document.querySelector("form");
const input = document.querySelector("input");

const state = {
  todo: [],
};

// creating getAllTodos func to retrieve all todos
const getAllTodos = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.todo = data;
      renderAllTodos()

    });
};

// creating createNewTodo func to post a todo to the list of todos
const createNewTodo = (newTodo) => {
  const todo = {
    title: newTodo,
    completed: false,
  };

  const options = {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  };

  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      state.todo.push(data);
      renderAllTodos();
    });
};


const renderAllTodos = () => {
    todoUl.innerHTML = ''
  state.todo.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element.title

    if (element.completed) {
      li.setAttribute("class", "completed");
    }
    todoUl.append(li);
  });
};

// adding an event listener to form
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let inputVal = input.value
    console.log(inputVal)
    createNewTodo(inputVal)
    form.reset()
})

getAllTodos();
renderAllTodos()

