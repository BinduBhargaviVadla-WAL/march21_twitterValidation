const { body, validationResult } = require("express-validator");
let todos = [
  { item: "initial todo", status: "complete" },
  { item: "initial todo", status: "complete" },
];
function getTodos(req, res) {
  res.json(todos);
}
const createTodo = [
  body("item")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("min should be 3 and max length is 20")
    .escape()
    .isAlphanumeric()
    .withMessage(
      "Only alphabets and numbers allowed. No special characters allowed"
    ),
  body("status")
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage("in range of 8 to 10 characters"),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { item, status } = req.body;
      todos.push({ item, status });
      res.json({ status: "adding todo complete" });
    }
  },
];
function deleteTodo(req, res) {
  console.log(req.params.indexToDelete);
  let newTodo = todos.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log("Came in return false");
      return false;
    } else {
      return true;
    }
  });
  console.log(newTodo);
  todos = newTodo;
  console.log(todos);
  res.json({ status: "Successfully deleted todos" });
}
module.exports = { getTodos, createTodo, deleteTodo };
