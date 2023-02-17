import { admin } from "../models/index.js"

export default async function(req, res) {
	const { firstName, lastName, username, password } = req.body
	// TODO: validation should occur on the front -- data here is assumed to be
	// validated (to some extent)

	const u_name = await admin.findOne({ where: { username } })
	const isUniqueUName = (u_name == null)

	if (!isUniqueUName) return res.status(400).json({message: "invalid username"})

	admin.create({ firstName, lastName, username, password})
		.then(
			(_) => res.status(200).json({message: "successful registration"})
		).catch(
			(error) => res.status(503).json({message: `Failed to create a new record : ${error}`})
		)
}