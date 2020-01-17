import mongoose from 'mongoose';
const focusSchema = mongoose.Schema({
	focus: {
		type: String
	},
	completed: {
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
});
const Focus = mongoose.model('Focus', focusSchema)

export default Focus