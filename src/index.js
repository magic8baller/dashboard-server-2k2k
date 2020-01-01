import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import {connectDB} from './config/db.js'
dotenv.config()
const app = express()
import usersRouter from './resources/user/user.router.js'
const {PORT} = process.env

connectDB()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(cookieParser())
app.use('/', usersRouter)
app.get('/', (req, res) => {
	res.send('VERY CA$H MONEY')
})

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))