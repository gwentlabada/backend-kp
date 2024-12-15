import dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

const db = new Sequelize("db_tataruang", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


export default db;