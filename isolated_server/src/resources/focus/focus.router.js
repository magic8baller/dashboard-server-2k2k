import express from 'express'
import focusControllers from './focus.controllers.js'
const focusRouter = express.Router()


/**
 * @route /api/focus
 * @desc main focus routes
 * @access private
 */

focusRouter
	.route('/')
	// .get(focusControllers.getMany)
	.post(focusControllers.createOne)


/**
 * @route /api/focus
 * @desc focus routes by ID
 * @access private
 */

focusRouter
	.route('/:id')
	.get(focusControllers.getOne)
	.put(focusControllers.updateOne)
	.delete(focusControllers.removeOne)

export default focusRouter