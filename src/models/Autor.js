import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const Autor = conexionPostgres.define(
   "autor",
   {
      autor_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "autor_id",
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
    tableName: "autor",
    freezeTableName: true,
   }
);
