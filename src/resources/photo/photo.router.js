import * as photoControllers from './photo.controllers.js'
import express from 'express'
const photoRouter = express.Router()

photoRouter.get('/', photoControllers.getMany)
photoRouter.get('/:id', photoControllers.getOne)
photoRouter.post('/daily', photoControllers.addDaily)
photoRouter.post('/save/:link', photoControllers.saveToFaves)
