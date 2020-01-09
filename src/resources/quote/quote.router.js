import express from 'express'
import quoteControllers from './quote.controllers.js'
const quoteRouter = express.Router()


/**
 * @route /api/quote
 * @desc main quote routes
 * @access private
 */

quoteRouter
	.route('/')
	// .get(quoteControllers.getMany)
	.post(quoteControllers.createOne)


/**
 * @route /api/quote
 * @desc quote routes by ID
 * @access private
 */

quoteRouter
	.route('/:id')
	.get(quoteControllers.getOne)
	.put(quoteControllers.updateOne)
	.delete(quoteControllers.removeOne)

export default quoteRouter