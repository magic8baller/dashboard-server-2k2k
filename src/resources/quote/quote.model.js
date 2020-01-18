import mongoose from 'mongoose'
const quoteSchema = mongoose.Schema({
	quote: {
		type: String,
		required: true,
		maxlength: 255
	},
	author: {
		type: String,
		required: true,
		maxlength: 50
	},
	favorite: {
		type: Boolean,
		required: true,
		default: false
	},
	userQuote: {
		type: Boolean,
		required: true,
		default: false
	},
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