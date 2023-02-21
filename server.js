const express = require("express");
const server = express();
const PORT = 3333;
const TODO_FILE_NAME = "./toDoList.json";
const { save, load } = require("./jsonUtil");

let toDoList = load(TODO_FILE_NAME);
console.log(toDoList);

function saveToDoList() {
  save(TODO_FILE_NAME, toDoList);
}

server.use(express.json());

server.get("/toDo", function (req, res) {
  res.json(toDoList);
});
server.post("/toDo", function (req, res) {
  const { newTodoItem } = req.body;
  toDoList.push(newTodoItem);
  saveToDoList();
  res.json(toDoList);
});
// server.put("/toDo", function (req, res) {
//   const body = req.body;
//   console.log(body);
//   res.json(toDoList);
// });
server.delete("/toDo/:deleteThisIndex", function (req, res) {
  const { deleteThisIndex } = req.params;
  console.log(deleteThisIndex);
  toDoList.splice(deleteThisIndex, 1);
  saveToDoList();
  res.json(toDoList);
});

server.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.get("*", function (req, res) {
  res.sendFile(__dirname + "/404.html");
});

server.listen(PORT, function () {
  console.log(`Now listening on Port: ${PORT}`);
});

function rand(lo, hi) {
  const diff = hi - lo;
  return Math.floor(Math.random() * diff + lo);
}
