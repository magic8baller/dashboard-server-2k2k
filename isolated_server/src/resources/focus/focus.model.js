import mongoose from 'mongoose'
const focusSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 100
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{timestamps: true}
)
const Focus = mongoose.model('Focus', focusSchema)

export default Focus