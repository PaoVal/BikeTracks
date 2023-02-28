export { default as landing } from "./landing.js"

// /inventory
export {
	view_inventory,
	add_inventory,
	delete_inventory,
	all_inventory
} from "./inventory/index.js"

// /inventory/edit
export {
	product,
	stock
} from "./inventory/edit/index.js"

// /sale
export { sale, monthly_get} from "./sales/index.js"