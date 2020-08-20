import express from 'express'
import { uuid } from 'uuidv4'

import Todo from '../models/Todo'

const router = express.Router()

let todos: Todo[] = []

router.get('/todos', (_, res) => {
  res.status(200).json({ todos })
})

router.post('/todos', (req, res) => {
  todos.push({ id: uuid(), text: req.body.text })
  res.status(201).json({ message: 'Insert success' })
})

router.put('/todos/:todoId', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === req.params.todoId)
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: req.body.text
  }
  res.status(200).json({ message: 'Update success' })
})

router.delete('/todos/:todoId', (req, res) => {
  todos = todos.filter(todo => todo.id !== req.params.todoId)
  res.status(200).json({ message: 'Delete success' })
})

export default router