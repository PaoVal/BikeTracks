import { product } from "../../models/index.js"

export default function (req, res) {
	const { name, brand, price, description } = req.body
	product.create({ name, brand, price, description })
	.then(
		(p) => res.status(200).json({message: "successful product creation", product: p})
	)
	.catch(
		(error) => res.status(503).json({message: `Failed to create new inventory item: ${error}`})
	)
}