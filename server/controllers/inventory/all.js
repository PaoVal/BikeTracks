import { product } from "../../models/index.js"

export default function (req, res) {
	var { page_num, max_num } = req.query
	page_num = parseInt(page_num)
	max_num = parseInt(max_num)

	product.findAll({ offset:page_num*max_num, limit:max_num }) 
	.then(
		(item) => res.status(200).json(item)
	).catch(
		(error) => res.status(503).json({message: `Internal error: ${error}`})
	)
}