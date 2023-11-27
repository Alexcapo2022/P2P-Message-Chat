import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const conexionPostgres = new Sequelize(process.env.POSTGRES_URI, {
   dialect: "postgres",
   dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
      decimalNumbers: true,
   },
   timezone: "-05:00",
   logging: false,
});
