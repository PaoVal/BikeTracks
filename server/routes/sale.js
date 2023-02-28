import express from "express"
import { sale, monthly_get } from "../controllers/index.js"

const { Router } = express
const route = Router()

route.post("/", sale)
route.get("/month", monthly_get)

export default route