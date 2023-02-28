import express from "express"
import {
	all_inventory,
	view_inventory,
	add_inventory,
	delete_inventory,
} from "../../controllers/index.js"
import { edit } from "./index.js"

const { Router } = express
const route = Router()

route.use("/edit", edit)

route.get("/all", all_inventory)
route.get("/", view_inventory)
route.post("/", add_inventory)
route.delete("/", delete_inventory)


export default route