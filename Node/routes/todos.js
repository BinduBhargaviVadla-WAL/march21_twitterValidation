var express = require("express");
var router = express.Router();
const todoController = require("../controllers/todo");
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.delete("/:indexToDelete", todoController.deleteTodo);
module.exports = router;
