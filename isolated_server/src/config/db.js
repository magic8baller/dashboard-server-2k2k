import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const {MONGODB_URI} = process.env

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})

		console.log('*** MongoDB Connected ! ***')
	} catch (err) {
		console.error(err.message)

		process.exit(1)
	}
}
