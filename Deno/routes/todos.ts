import { Router } from "https://deno.land/x/oak/mod.ts"
import { v4 as uuid } from "https://deno.land/std/uuid/mod.ts"

import Todo from '../models/Todo.ts'

const router = new Router()

let todos: Todo[] = []

router.get('/todos', (ctx) => {
  ctx.response.body = { todos }
})

router.post('/todos', async (ctx) => {
  const bodyData = await ctx.request.body().value

  const newTodo: Todo = {
    id: uuid.generate(),
    text: bodyData.text
  }
  todos.push(newTodo)

  ctx.response.body = {
    message: 'Created todo',
    todo: newTodo
  }
})

router.put('/todos/:todoId', async (ctx) => {
  const todoId = ctx.params.todoId
  const bodyData = await ctx.request.body().value

  const todoIndex = todos.findIndex(todo => todo.id === todoId)
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: bodyData.text
  }

  ctx.response.body = { message: 'Updated todo' }
})

router.delete('/todos/todoId', (ctx) => {
  const todoId = ctx.params.todoId
  todos = todos.filter(todo => todo.id !== todoId)
  ctx.response.body = { message: 'Deleted todo' }
})

export default router