import express from "express"

import { initdb } from "./config/index.js"

const PORT = process.env.PORT || 3001
const app = express()

initdb()

// TODO: move to proper folder
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" })
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
});