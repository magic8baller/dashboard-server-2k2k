import axios from 'axios'
const APP_ID = '3b46a96cce0a22e7c93cebef8a8eab04e97b1490c700798c26e06f0d16922950'
/**
 * @route GET /api/${resource}/:id
 * @desc Get User resource by ID
 * @access private
 */
export const getOne = model => async (req, res) => {
	try {
		const doc = await model
			.findOne({createdBy: req.user._id, _id: req.params.id})
			.lean()
			.exec()

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !doc) {
			return res.status(404).json({message: `Resource not found`, success: false, user: `${req.user._id}`});
		}
		console.log('Fetched document: ', doc)
		res.status(200).json(doc)

	} catch (e) {
		console.error('Error getting document:', e.message)
		res.status(400).end()
	}
}

/**
 * @route GET /api/${resource}
 * @desc Get all User resources
 * @access private
 */
export const getMany = model => async (req, res) => {
	try {
		const docs = await model
			.find({createdBy: req.user._id})
			.sort({
				date: -1
			})
			.lean()
			.exec()

		if (!docs) {
			return res.status(201).send(`Just an FYI: User doesn't have any of these resources in the database`)
		}
		console.log(`Documents in descending order: `, docs)
		res.status(200).json(docs)
	} catch (e) {
		console.error(`Error getting all Resources: `, e.message)
		res.status(400).send(e.message)
	}
}

/**
 * @route POST /api/${resource}
 * @desc Create resource
 * @access private
 */
export const createOne = model => async (req, res) => {
	const createdBy = req.user._id
	try {
		const doc = await new model({...req.body, createdBy})
		await doc.save()
		console.log('new doc: ', doc)
		res.status(201).json(doc)
	} catch (e) {
		console.error(e.message)
		res.status(400).json({error: e.message, message: 'Could not create document'})
	}
}

/**
 * @route PUT /api/${resource}/:id
 * @desc Update User resource by ID
 * @access private
 */
export const updateOne = model => async (req, res) => {
	try {
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					createdBy: req.user._id,
					_id: req.params.id
				},
				req.body,
				{new: true}
			)
			.lean()
			.exec()

		if (!updatedDoc) {
			return res.status(400).send('Update Error: document not found')
		}
		console.log('updated doc: ', updatedDoc)
		res.status(200).json(updatedDoc)
	} catch (e) {

		res.status(400).send(e.message)
	}
}

/**
 * @route DELETE /api/${resource}/:id
 * @desc Delete User resource by ID
 * @access private
 */
export const removeOne = model => async (req, res) => {
	try {
		const removed = await model.findOneAndRemove({
			createdBy: req.user._id,
			_id: req.params.id
		})

		if (!removed) {
			return res.status(400).send(`Delete error: document not found`)
		}

		return res.status(200).json({message: 'Delete successful', doc: removed})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

/**
 * @route POST /api/photos/daily
 * @desc Create resource
 * @access private
 */
export const getDaily = (model) => async (req, res) => {
	const createdBy = req.user._id
	try {
		const fetchUnsplashResponse = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${APP_ID}&featured=true&q=outdoors`)

		const doc = new model({url: fetchUnsplashResponse.data.urls.full, createdBy})
		await doc.save()
		console.log('new doc: ', doc)
		res.status(201).json(doc)
	} catch (e) {
		console.error(e.message)
		res.status(400).json({error: e.message, message: 'Could not get unsplash photo'})
	}
}
/**
 * @route POST /api/photos/save/:link
 * @desc Update User resource by ID
 * @access private
 */
export const saveToFaves = model => async (req, res) => {
	try {
		const updatedDoc = await model
			.findOneAndUpdate(
				{
					createdBy: req.user._id,
					_id: req.params.id
				},
				{...req.body, url: decodeURIComponent(req.params.link)},
				{new: true}
			)
			.lean()
			.exec()

		if (!updatedDoc) {
			return res.status(400).send('Update Error: document not found')
		}
		console.log('updated doc: ', updatedDoc)
		res.status(200).json(updatedDoc)
	} catch (e) {

		res.status(400).send(e.message)
	}
}
export const crudControllers = model => ({
	removeOne: removeOne(model),
	updateOne: updateOne(model),
	getMany: getMany(model),
	getOne: getOne(model),
	createOne: createOne(model),
	getDaily: getDaily(model),
	saveToFaves: saveToFaves(model)
})