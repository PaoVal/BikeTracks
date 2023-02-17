import DataTypes from "sequelize"
import bcrypt from "bcrypt"
import { connection } from "./../config/index.js"

const admin_data = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}

const admin_options = {
	hooks: {
		beforeCreate: async (user) => {
			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(user.password, salt)
		}
	}  
}

export const admin = connection.define("Admin", admin_data, admin_options)

admin.prototype.isPasswordValid = async function(password) {
	return await bcrypt.compare(password, this.password);
}