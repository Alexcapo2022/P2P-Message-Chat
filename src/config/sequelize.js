import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const conexionPostgres = new Sequelize("postgres://bsadmin:aK%25c$DPt9RG$jA8@bookswapdb.postgres.database.azure.com:5432/bookswap", {
   dialect: "postgres",
   dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
      decimalNumbers: true,
   },
   timezone: "-05:00",
   logging: false,
});
