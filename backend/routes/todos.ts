import { Router } from "https://deno.land/x/oak/mod.ts"

import * as todosController from '../controllers/todos.ts'

const router = new Router()

router.get('/todos', todosController.getTodos)

router.post('/todos', todosController.postTodo)

router.put('/todos/:todoId', todosController.updateTodo)

router.delete('/todos/:todoId', todosController.deleteTodo)

export default router