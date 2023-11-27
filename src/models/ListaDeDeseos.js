import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";

export const ListaDeDeseos = conexionPostgres.define(
    'Lista_De_Deseos',
    {
      Usuario_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Usuario', 
          key: 'Usuario_ID',
        },
      },
      Libro_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Libro', 
          key: 'Libro_ID',
        },
      },
      Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'Lista_De_Deseos',
      freezeTableName: true,
    }
  );
  