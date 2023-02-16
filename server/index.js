import express from "express"

import { initdb, cors_config } from "./config/index.js"
import { landing } from "./routes/index.js";

const PORT = process.env.PORT || 3001
const app = express()

initdb()
app.use(cors_config)

app.use("/", landing);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
});