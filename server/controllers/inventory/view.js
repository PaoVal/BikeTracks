import { product } from "../../models/index.js"

export default function (req, res) {
	const { id } = req.body

	product.findOne({ where: { id } })
	.then(
		(item) => {
			if (item == null) return res.status(404).json({message: "product not found"})

			const { name, brand, price, description, count } = item
			const item_details = {name, brand, price, description, count}

			res.status(200).json(item_details)
		}
	).catch(
		(error) => res.status(503).json({message: `Internal error: ${error}`})
	)
}