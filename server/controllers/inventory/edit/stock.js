import { product } from "../../../models/index.js"

export default function (req, res) {
	const { id, stock } = req.body
	product.update(
		{ count: stock },
		{ where: { id } }
	).then(
		(modified_product) => {
			if (modified_product <= 0) return res.status(404).json({message: "product not found"})

			res.status(200).json({message: "successful stock update", count: stock})
		}
	).catch(
		(error) => res.status(503).json({message: `Failed to update product: ${error}`})
	)
}