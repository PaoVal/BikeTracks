import { admin } from "../models/index.js"

export default function (req, res) {
	const { username, password } = req.body

	admin.findOne({ where: {username: username} })
		.then( async function (user) {
			if (!user) 
				return res.status(404).json({message: "invalid username"})

			if (!await user.isPasswordValid(password))
				return res.status(401).json({message: "invalid password"})

			res.status(200).json({message: "successful login"} )
		})
}