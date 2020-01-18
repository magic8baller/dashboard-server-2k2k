import mongoose from 'mongoose'
const quoteSchema = mongoose.Schema({
	quote: String,
	author: String,
	favorite: Boolean,
	userQuote: Boolean,
	date: String,
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
})
const Quote = mongoose.model('Quote', quoteSchema)

export default Quote