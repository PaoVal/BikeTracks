import DataTypes from "sequelize"
import { connection } from "./../config/index.js"

const adminData = {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}

export const admin = connection.define("Admin", adminData.schema)