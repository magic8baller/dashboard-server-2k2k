import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import {auth} from './authMiddleware.js'
import {connectDB} from './config/db.js'
import todoRouter from './resources/todo/todo.router.js'
import noteRouter from './resources/note/note.router.js'
import quoteRouter from './resources/quote/quote.router.js'
import usersRouter from './resources/user/user.router.js'
dotenv.config()

const app = express()
const {PORT} = process.env

connectDB()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api', auth({role: ['user']}))
app.use('/api/todos', todoRouter)
app.use('/api/notes', noteRouter)
app.use('/api/quotes', quoteRouter)
app.use('/', usersRouter)

app.get('/', (req, res) => {
	res.send('VERY CA$H MONEY')
})

export const start = async () => {
	try {
		app.listen(PORT, () => console.log(`REST API at http://localhost:${PORT}`))
	} catch (error) {
		console.error(error)
	}
}