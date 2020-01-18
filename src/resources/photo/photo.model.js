import mongoose from 'mongoose'
const photoSchema = mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	favorite: {
		type: Boolean,
		required: true,
		default: false
	},
	userPhoto: {
		type: Boolean,
		required: true,
		default: false
	},
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
})
const Photo = mongoose.model('Photo', photoSchema)

export default Photo