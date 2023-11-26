import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const Direccion = conexionPostgres.define(
   "direccion",
   {
      direccion_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "direccion_id",
      },
      calle: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "direccion",
      },
      numero: {
         type: DataTypes.STRING(10),
         allowNull: false,
         field: "numero",
      },
      distrito: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "distrito",
      },
      ciudad: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "ciudad",
      },
      estado: {
         type: DataTypes.INTEGER,
         defaultValue: 1,
         field: "estado",
      },
   },
   {
      timestamps: false,
      tableName: "direccion",
      freezeTableName: true,
   }
);
