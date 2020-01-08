import bcrypt from 'bcryptjs'
import express from 'express'
import {auth} from '../../authMiddleware.js'
import User from './user.model.js'
const usersRouter = express.Router()

usersRouter.post('/register', async (req, res) => {

	try {
		const user = new User(req.body)
		if (user.password) {
			user.password = bcrypt.hashSync(req.body.password, 8)
		}
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({user, token})
	} catch (error) {
		res.status(400).send(error.message)
	}
})

usersRouter.get('/users', auth({role: ['admin']}), async (req, res) => {
	const dbUsers = await User.find({}).select('-tokens').select('-password')
	res.send(dbUsers)
})

usersRouter.post('/login', async (req, res) => {
	try {
		const {email, password} = req.body
		let user = await User.findByCredentials(email, password)
		if (!user) {
			return res.status(401).send({error: 'Login failed. Check login credentials'})
		}
		const token = await user.generateAuthToken()
		user.password = null
		res.send({user, token})
	} catch (error) {
		console.log('req.body', req.body)
		res.status(400).send(error.message)
	}
})

usersRouter.get('/me', auth({role: ['user']}), (req, res) => {
	res.send(req.user)
})

usersRouter.post('/me/logout', auth({role: ['user']}), async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token != req.token
		})
		await req.user.save()
		console.log('logged out')
		res.send()
	} catch (error) {
		res.status(500).send(error.message)
	}
})

//logout on all devices
usersRouter.post('/me/logoutall', auth({role: ['user']}), async (req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length)
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send(error.message)
	}
})
//update user
usersRouter.put('/me', auth({role: ['user']}), async (req, res) => {
	let user = await User.findOneAndUpdate({_id: req.user._id}, {name: req.body.name, email: req.body.email}, {new: true})

	if (req.body.password) {
		user.password = await bcrypt.hashSync(req.body.password, 8)
	}
	user.save()
	.then(updatedUser => res.send(updatedUser))
	.catch(error => console.error(error))
})


usersRouter.put('users/:userId', auth({role: ['admin']}), async (req, res) => {
	let user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
	if (req.body.password) {
		user.password = await bcrypt.hashSync(req.body.password, 8)
	}

	user.save()
	.then(userResult => res.send(userResult))
	.catch(error => console.error(error))
})
export default usersRouter