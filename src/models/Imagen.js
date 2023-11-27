import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const Imagen = conexionPostgres.define(
   "imagen",
   {
      imagen_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "imagen_id",
      },
      url: {
         type: DataTypes.STRING(512),
         allowNull: false,
         field: "url",
      },
      libro_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Puedes ajustar esto según tus necesidades
        field: "libro_id",
      },
      estado: {
         type: DataTypes.INTEGER,
         defaultValue: 1,
         field: "estado",
      },
   },
   {
    timestamps: false,
    tableName: "imagen",
    freezeTableName: true,
   }
);