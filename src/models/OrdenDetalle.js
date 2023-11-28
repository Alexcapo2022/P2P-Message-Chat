import { conexionPostgres } from "../config/sequelize.js";
import { Libro } from "./Libro.js";
import { Orden } from "./Orden.js";

export const Orden_Detalle = conexionPostgres.define(
  'orden_detalle',{},{
    timestamps: false,
    modelName: "orden_detalle",
    freezeTableName: true,
  }
)

Libro.belongsToMany(Orden, { through: Orden_Detalle, uniqueKey: "orden_detalle_id", foreignKey: "libro_id"});
Orden.belongsToMany(Libro, { through: Orden_Detalle, uniqueKey: "orden_detalle_id", foreignKey: "orden_id"});