import express from "express"
import { product, stock } from "../../controllers/index.js"

const { Router } = express
const route = Router()

route.put("/product", product)
route.put("/stock", stock)


export default route