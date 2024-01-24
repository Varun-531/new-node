// const express = require("express");
// const { request, response } = require("express");
// const app = express();
// const { Todo } = require("./models");
// const bodyParser = require("body-parser");
// const todo = require("./models/todo");
// app.use(bodyParser.json());
// const path = require("path");

// app.set("view engine","ejs");

// app.get("/",async(request,response)=>{
//   const allTodos = await Todo.getTodos();
//   if(request.accepts("html")){
//     response.render('index',{
//       allTodos
//     });
   
//   }
//   else{
//       response.json({
//         allTodos
//       })
//   }
//   response.render('index');
// })

// app.use(express.static(path.join(__dirname,'public')));

// app.get("/todos", (request, response) => {
//   console.log("Todo list",request.body);
// });

// app.post("/todos", async (request, response) => {
//   console.log("Creating a todo", request.body);
//   try {
//     const todo = await Todo.addTodo({
//       title: request.body.title,
//       dueDate: request.body.dueDate,
//       completed: false,
//     });
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error)
//   }
// });

// app.put("/todos/:id/markAsCompleted",async (request, response) => {
//   console.log("We have to update a todo with ID:", request.params.id);
//   const todo = await Todo.findByPk(request.params.id)
//   try {
//     const updatedTodo = await todo.markAsCompleted()
//     return response.json(updatedTodo);
//   } catch (error) {
//     return response.status(422).json(error)
//   }
// });

// app.delete("/todos/:id", (request, response) => {
//   console.log("Delete a todo by ID: ", request.params.id);
// });

// module.exports = app;

const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  try {
    const allTodos = await Todo.getTodos();
    
    if (request.accepts("html")) {
      response.render('index', {
        allTodos
      });
    } else {
      response.json({
        allTodos
      });
      return; // Exit the function after sending the JSON response
    }
  } catch (error) {
    console.error("Error retrieving todos:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/todos", (request, response) => {
  console.log("Todo list", request.body);
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error)
  }
});

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id)
    const updatedTodo = await todo.markAsCompleted()
    return response.json(updatedTodo);
  } catch (error) {
    return response.status(422).json(error)
  }
});

app.delete("/todos/:id", (request, response) => {
  console.log("Delete a todo by ID: ", request.params.id);
  // Implement your delete logic here
});

module.exports = app;
