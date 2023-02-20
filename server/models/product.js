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
	price: { // TODO: might want to split up onto another object with amount+currency
		type: DataTypes.DECIMAL,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT('tiny'),
		allowNull: true
	},
	count: { // TODO: note to self, could separate onto separate "stock"
		type: DataTypes.INTEGER,
		defaultValue: 0,
	}
	// TODO: additional image field?
	// TODO: tags for filtering stats?
}

export const product = connection.define("Product", product_data)