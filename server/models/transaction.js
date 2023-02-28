import DataTypes from "sequelize"
import { connection } from "../config/index.js"

const transaction_data = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	product_id: {
		type: DataTypes.UUID,
		allowNull: false
	},
	sale_price: {
		type: DataTypes.DECIMAL,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}

export const transaction = connection.define("Transaction", transaction_data)