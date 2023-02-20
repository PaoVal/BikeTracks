import DataTypes from "sequelize"
import { connection } from "../config/index.js"
import { product } from "./index.js"

const transaction_data = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	sale_price: { // TODO: might want to split up onto another object with amount+currency
		type: DataTypes.DECIMAL,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW
	}
}

export const transaction = connection.define("Transaction", transaction_data)
product.hasMany(transaction, {
	foreignKey: {
		allowNull: false
	}
})
transaction.belongsTo(product, {
	onDelete: 'CASCADE'
})