import mongoose from 'mongoose';
const linksSchema = mongoose.Schema({
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
const Links = mongoose.model('Links', linksSchema)

export default Links