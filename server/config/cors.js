import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const config = {
	credentials: true,
	origin: process.env.ORIGIN
}

export const cors_config = cors(config)