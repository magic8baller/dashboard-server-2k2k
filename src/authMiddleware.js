import jwt from 'jsonwebtoken'
import User from './resources/user/user.model.js'
import dotenv from 'dotenv'
dotenv.config()
const {JWT_SECRET} = process.env


export const auth = options => (req, res, next) => {
	try {
		const token = req.headers.authorization.split('Bearer ')[1].trim()
		const data = jwt.verify(token, JWT_SECRET)

		User.findOne({_id: data._id, 'tokens.token': token}).select('-password')
		.then(user => {
			req.user = user
			req.token = token

			if(!user.role.includes(options.role)) {
				if(!user.role === 'admin') {
					throw new Error()
				}
			}
			next()
		})
		.catch(error => res.status(401).send({error: 'Not authorized to access this page'}))
	} catch (error) {
		res.status(401).send({error: 'Not authorized to access this page'})
	}
}