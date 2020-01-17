import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import validator from 'validator'
dotenv.config()
const {JWT_SECRET} = process.env



const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: value => {
			if (!validator.isEmail(value)) {
				throw new Error({error: 'Invalid Email address'})
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 7
	},
	role: {
		type: String,
		default: 'user'
	},
	tokens: [{
		token: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}]

}, {timestamp: true}
)

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: '1d'})
	user.tokens = user.tokens.concat({token})
	await user.save()
	return token
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({email})
	if (!user) {
		throw new Error({error: 'Invalid login credentials.'})
	}
	const isValidPassword = await bcrypt.compare(password, user.password)
	if (!isValidPassword) {
		throw new Error({error: 'Invalid login credentials.'})
	}
	return user
}

const User = mongoose.model('User', userSchema)

export default User