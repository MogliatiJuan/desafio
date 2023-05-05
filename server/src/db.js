import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./models/users.js";

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
	}
);

const User = UserModel(sequelize, Sequelize);

await sequelize.sync();
console.log("All models were synchronized succesfully");

export { User };
