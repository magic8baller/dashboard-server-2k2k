import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 100
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
	},
	{timestamps: true}
)

const Todo = mongoose.model('todo', todoSchema)

export default Todo