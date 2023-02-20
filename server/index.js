import express from "express"
import bodyParser from "body-parser"

import { connectdb, cors_config } from "./config/index.js"
import { landing, login, register, inventory } from "./routes/index.js"
import { product, transaction } from "./models/index.js"

const PORT = process.env.PORT || 3001
const app = express()

connectdb()
product.sync()
transaction.sync()

app.use(cors_config)
app.use(bodyParser.json())

app.use("/", landing)
app.use("/login", login)
app.use("/register", register)
app.use("/inventory", inventory)

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
});