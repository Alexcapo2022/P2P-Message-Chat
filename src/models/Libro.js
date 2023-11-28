import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";
import { Autor } from "./Autor.js";
import { Editorial } from "./Editorial.js";
import { Categoria } from "./Categoria.js";
import { Usuario } from "./Usuario.js";

export const Libro = conexionPostgres.define(
   "libro",
   {
      libro_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "libro_id",
      },
      titulo: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "titulo",
      },
      estado_libro: {
         type: DataTypes.STRING(100),
         allowNull: false,
         field: "estado_libro",
      },
      isbn: {
         type: DataTypes.STRING(13),
         allowNull: false,
         field: "isbn",
      },
      idioma: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "idioma",
      },
      numero_paginas: {
         type: DataTypes.INTEGER,
         allowNull: false,
         field: "numero_paginas",
      },
      fecha_publicacion: {
         type: DataTypes.DATE,
         allowNull: false,
         field: "fecha_publicacion",
      },
      precio: {
         type: DataTypes.DECIMAL(10, 2),
         get() {
            // Workaround until sequelize issue #8019 is fixed
            const value = this.getDataValue("precio");
            return value === null ? null : parseFloat(value);
         },
         allowNull: false,
         field: "precio",
      },
      encuadernacion: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "encuadernacion",
      },
      sinopsis: {
         type: DataTypes.TEXT,
         allowNull: false,
         field: "sinopsis",
      },
      estado: {
         type: DataTypes.INTEGER,
         field: "estado",
         defaultValue: 1,
      },
   },
   {
      modelName: "libro",
      freezeTableName: true,
   }
);

Libro.belongsTo(Autor, { foreignKey: "autor_id", as: "autor" });
Autor.hasMany(Libro, { foreignKey: "autor_id" });

Libro.belongsTo(Editorial, { foreignKey: "editorial_id", as: "editorial" });
Editorial.hasMany(Libro, { foreignKey: "editorial_id" });

Libro.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });
Categoria.hasMany(Libro, { foreignKey: "categoria_id" });

Libro.belongsTo(Usuario, { foreignKey: "vendedor_id", as: "vendedor" });
Usuario.hasMany(Libro, { foreignKey: "vendedor_id" });