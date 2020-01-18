import Photo from './photo.model.js'
import axios from 'axios'

/**
 * @route GET /api/photos/:id
 * @desc Get User Photo by ID
 * @access private
 */
export const getOne = () => async (req, res) => {
	try {
		const doc = await Photo
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
 * @route GET /api/photos
 * @desc Get all User resources
 * @access private
 */
export const getMany = () => async (req, res) => {
	try {
		const docs = await Photo
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
 * @route POST /api/photos/daily
 * @desc Create resource
 * @access private
 */
export const addDaily = () => async (req, res) => {
	const createdBy = req.user._id
	try {
		const fetchUnsplashResponse = await axios.get('https://source.unsplash.com/category/nature/daily')

		const doc = await new Photo({url: fetchUnsplashResponse.request.res.responseUrl, createdBy})
		await doc.save()
		console.log('new doc: ', doc)
		res.status(201).json(doc)
	} catch (e) {
		console.error(e.message)
		res.status(400).json({error: e.message, message: 'Could not add unsplash photo'})
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