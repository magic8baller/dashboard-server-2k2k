import mongoose from 'mongoose'
const photoSchema = mongoose.Schema({
	url: String,
	filename: String,
	favorite: Boolean,
	userPhoto: Boolean,
	date: String,
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
})
const Photo = mongoose.model('Photo', photoSchema)

export default Photo