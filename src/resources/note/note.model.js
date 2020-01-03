import mongoose from 'mongoose'

let today = new Date()
let formattedDate = today.toLocaleDateString("en-GB")
// let formattedUpdateDate = today.toLocaleString()

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
		type: Date,
		time: new Date()
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