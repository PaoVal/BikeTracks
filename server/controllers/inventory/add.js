import { product } from "../../models/index.js"

export default function (req, res) {
	const { name, brand, price, description } = req.body
	// TODO: validate description character count
	// TODO: validate price is >0
	// TODO: validation on the front^^

	product.create({ name, brand, price, description })
	.then(
		(_) => res.status(200).json({message: "successful product creation"})
	)
	.catch(
		(error) => res.status(503).json({message: `Failed to create new inventory item: ${error}`})
	)
}