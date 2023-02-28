import { transaction } from "../../models/index.js"
import { stock } from "../index.js"

export default function (req, res) {
	const { sale_price, product_id, curr_stock, sold_count, date } = req.body
	const new_stock = curr_stock - sold_count

	if (new_stock < 0) return res.status(400).json({message: `Bad Request: Cannot sell more than ${curr_stock}`})
	const sale = { sale_price, product_id, date }

	const sales = new Array(sold_count)
	for (var i = 0; i < sold_count; i++) {
		sales[i] = sale
	}

	transaction.bulkCreate(sales)
	.then(
		() => {
			req.body.id = product_id
			req.body.stock = new_stock
			stock(req, res)
		}
	)
	.catch(
		(error) => res.status(503).json({message: `Failed to create new transaction: ${error}`})
	)
}