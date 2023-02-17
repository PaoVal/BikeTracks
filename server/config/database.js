import Sequelize from "sequelize"
import dotenv from "dotenv"
const { config } = dotenv
config()
 
export const connection = 
new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		// logging: false // TODO: change to false when you're done 
	}
)

export function connectdb() {
	connection.authenticate()
	.then(() => console.log('Database connection established'))
	.catch((error) => console.error('Unable to connect to database: ', error))
}