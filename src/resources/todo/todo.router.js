import express from 'express'
import todoControllers from './todo.controllers.js'
const todoRouter = express.Router()

/**
 * @route /api/todo
 * @desc main todo routes
 * @access private
 */

todoRouter
	.route('/')
	.get(todoControllers.getMany)
	.post(todoControllers.createOne)

/**
 * @route /api/todo/:id
 * @desc todo routes by ID
 * @access private
 */

todoRouter
	.route('/:id')
	.get(todoControllers.getOne)
	.put(todoControllers.updateOne)
	.delete(todoControllers.removeOne)

export default todoRouter