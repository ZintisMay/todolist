const express = require("express");
const server = express();
const PORT = 3333;

let list = ["apples"];

let todoList = [];

server.use(express.json());

server.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.get("/list", function (req, res) {
  res.json(list);
});

server.post("/post", function (req, res) {
  console.log(req.body);
  res.json(req.body);
});

server.post("/todo", function (req, res) {
  const body = req.body;
  console.log(body);
  if (body.newTodoItem) {
    todoList.push(body.newTodoItem);
  }
  res.json(todoList);
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
