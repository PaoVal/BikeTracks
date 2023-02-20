import express from "express"
import {
	view_inventory,
	add_inventory,
	delete_inventory,
	edit_inventory
} from "../controllers/index.js"

const { Router } = express
const route = Router()

route.get("/", view_inventory)
route.post("/", add_inventory)
route.delete("/", delete_inventory)
route.put("/", edit_inventory)

export default route