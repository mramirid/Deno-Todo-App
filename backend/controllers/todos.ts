import { RouterMiddleware } from 'https://deno.land/x/oak/mod.ts'
import { ObjectId } from 'https://deno.land/x/mongo@v0.10.1/mod.ts'

import { getDB } from '../helpers/db_client.ts'

interface Todo {
  id?: string
  text: string
}

export const getTodos: RouterMiddleware = async (ctx) => {
  try {
    const todos = await getDB().collection<Todo>('todos').find()
    const transformedTodo = todos.map(todo => {
      return {
        id: todo._id.$oid,
        text: todo.text
      }
    })
    ctx.response.body = { todos: transformedTodo }
  } catch (error) {
    console.log(error)
  }
}

export const postTodo: RouterMiddleware = async (ctx) => {
  try {
    const bodyData = await ctx.request.body().value

    const newTodo: Todo = { text: bodyData.text }
    const _id = await getDB().collection('todos').insertOne(newTodo)
    newTodo.id = _id.$oid

    ctx.response.body = {
      message: 'Created todo',
      todo: newTodo
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateTodo: RouterMiddleware = async (ctx) => {
  const todoId = ctx.params.todoId!
  const bodyData = await ctx.request.body().value

  await getDB().collection('todos').updateOne(
    { _id: ObjectId(todoId) },
    { $set: { text: bodyData.text } }
  )

  ctx.response.body = { message: 'Updated todo' }
}

export const deleteTodo: RouterMiddleware = async (ctx) => {
  const todoId = ctx.params.todoId!

  await getDB().collection('todos').deleteOne({ _id: ObjectId(todoId) })

  ctx.response.body = { message: 'Deleted todo' }
}