import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const MetodoPago = conexionPostgres.define(
  "metodopago",
  {
    editorial_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      field: "metodopago_id",
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "tipo",
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_creacion",
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_actualizacion",
    },
  },
  {
    timestamps: false,
    tableName: "metodopago",
    freezeTableName: true,
  }
);
