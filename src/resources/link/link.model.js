import mongoose from 'mongoose';
const linkSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxLength: 25
	},
	url: {
		type: String,
		required: true
	},
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user',
		required: true
	}
}, {
	timestamps: true
});
const Link = mongoose.model('Link', linkSchema)

export default Link