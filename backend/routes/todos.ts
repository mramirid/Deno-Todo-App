import { Router } from "https://deno.land/x/oak/mod.ts"

import * as todosController from '../controllers/todos.ts'

const router = new Router()

interface Todo {
  id?: string
  text: string
}

let todos: Todo[] = []

router.get('/todos', todosController.getTodos)

router.post('/todos', todosController.postTodo)

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