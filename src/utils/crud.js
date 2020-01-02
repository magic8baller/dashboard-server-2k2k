/**
 * @route GET /api/${document}/:id
 * @desc Get User document by ID
 * @access private
 */
export const getOne = model => async (req, res) => {
	try {
		const doc = await model
			.findOne({createdBy: req.user._id, _id: req.params.id})
			.lean()
			.exec()

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !doc) {
			return res.status(404).json({message: `${model} not found`, success: false});
		}
console.log(doc)
		res.status(200).json(doc)
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

/**
 * @route GET /api/${document}
 * @desc Get all User documents
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

		res.status(200).json(docs)
	} catch (e) {

		res.status(400).send(e.message)
	}
}

/**
 * @route POST /api/${document}
 * @desc Create document
 * @access private
 */
export const createOne = model => async (req, res) => {
	const createdBy = req.user._id
	try {
		const doc = await new model({...req.body, createdBy})
		await doc.save()
		res.status(201).json(doc)
	} catch (e) {
		res.status(400).send(e.message)
	}
}

/**
 * @route PUT /api/${document}/:id
 * @desc Update User document by ID
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
			return res.status(400).send(`No ${model} found`)
		}

		res.status(200).json(updatedDoc)
	} catch (e) {

		res.status(400).send(e.message)
	}
}

/**
 * @route DELETE /api/${document}/:id
 * @desc Delete User document by ID
 * @access private
 */
export const removeOne = model => async (req, res) => {
	try {
		const removed = await model.findOneAndRemove({
			createdBy: req.user._id,
			_id: req.params.id
		})

		if (!removed) {
			return res.status(400).send(`${model} not found`)
		}

		return res.status(200).json({message: 'removed', doc: removed})
	} catch (e) {
		console.error(e)
		res.status(400).end()
	}
}

export const crudControllers = model => ({
	removeOne: removeOne(model),
	updateOne: updateOne(model),
	getMany: getMany(model),
	getOne: getOne(model),
	createOne: createOne(model)
})