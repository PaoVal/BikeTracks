import DataTypes from "sequelize"
import { connection } from "./../config/index.js"

const product_data = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	brand: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.DECIMAL,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT('tiny'),
		allowNull: true
	},
	count: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	}
}

export const product = connection.define("Product", product_data)