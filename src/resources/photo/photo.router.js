import photoControllers from './photo.controllers.js'
import express from 'express'
const photoRouter = express.Router()

photoRouter.route('/')
.get(photoControllers.getMany)
.post(photoControllers.createOne)

photoRouter.route('/:id')
.get(photoControllers.getOne)
.put(photoControllers.updateOne)

photoRouter.route('/daily')
.post(photoControllers.getDaily)



export default photoRouter