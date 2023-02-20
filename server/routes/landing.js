import express from "express"
import { landing } from "../controllers/index.js"

const { Router } = express
const route = Router()

route.get("/", landing)

export default route