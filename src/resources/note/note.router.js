import express from 'express'
import noteControllers from './note.controllers.js'
const noteRouter = express.Router()


/**
 * @route /api/note
 * @desc main note routes
 * @access private
 */

noteRouter
	.route('/')
	.get(noteControllers.getMany)
	.post(noteControllers.createOne)


/**
 * @route /api/note
 * @desc note routes by ID
 * @access private
 */

noteRouter
	.route('/:id')
	.get(noteControllers.getOne)
	.put(noteControllers.updateOne)
	.delete(noteControllers.removeOne)

export default noteRouter