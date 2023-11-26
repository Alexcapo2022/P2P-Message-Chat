import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const Editorial = conexionPostgres.define(
   "editorial",
   {
      editorial_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "editorial_id",
      },
      nombre: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "nombre",
      },
      estado: {
         type: DataTypes.INTEGER,
         defaultValue: 1,
         field: "estado",
      },
   },
   {
    timestamps: false,
    tableName: "editorial",
    freezeTableName: true,
   }
);