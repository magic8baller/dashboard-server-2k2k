import mongoose from 'mongoose'

const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const today = new Date();
const formattedDate = today.toLocaleString("en-GB", options)

const noteSchema = new mongoose.Schema(
	{
		title: {type: String,
			required: true,
			default: formattedDate
		},
		body: {
			type: String,
			required: true,
			maxlength: 1000
		},
	updatedAt: {
		type: String,
		required: true,
		default: formattedDate


	},
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{timestamps: true}
)

const Note = mongoose.model('note', noteSchema)

export default Note