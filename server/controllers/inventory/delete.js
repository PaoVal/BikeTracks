import { product } from "../../models/index.js"

export default function (req, res) {
	const { id } = req.body

	product.destroy({ where: { id } })
	.then(
		(_) => res.status(200).json({message: "successful product deletion"})
	).catch(
		(error) => res.status(503).json({message: `Failed to delete product: ${error}`})
	)
}