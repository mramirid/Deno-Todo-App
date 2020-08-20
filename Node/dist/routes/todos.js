"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuidv4_1 = require("uuidv4");
const router = express_1.default.Router();
let todos = [];
router.get('/todos', (_, res) => {
    res.status(200).json({ todos });
});
router.post('/todos', (req, res) => {
    todos.push({ id: uuidv4_1.uuid(), text: req.body.text });
    res.status(201).json({ message: 'Insert success' });
});
router.put('/todos/:todoId', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.todoId);
    todos[todoIndex] = {
        id: todos[todoIndex].id,
        text: req.body.text
    };
    res.status(200).json({ message: 'Update success' });
});
router.delete('/todos/:todoId', (req, res) => {
    todos = todos.filter(todo => todo.id !== req.params.todoId);
    res.status(200).json({ message: 'Delete success' });
});
exports.default = router;
