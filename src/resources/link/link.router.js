import express from 'express'
import linkControllers from './link.controllers.js'
const linkRouter = express.Router()

/**
 * @route /api/link
 * @desc main link routes
 * @access private
 */

linkRouter
	.route('/')
	.get(linkControllers.getMany)
	.post(linkControllers.createOne)

/**
 * @route /api/link/:id
 * @desc link routes by ID
 * @access private
 */

linkRouter
	.route('/:id')
	.get(linkControllers.getOne)
	.put(linkControllers.updateOne)
	.delete(linkControllers.removeOne)

export default linkRouter