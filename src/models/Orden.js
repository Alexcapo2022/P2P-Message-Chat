import { DataTypes } from "sequelize";
import { conexionPostgres } from "../config/sequelize.js";
import { Usuario } from "./Usuario.js";
import { MetodoPago } from "./MetodoPago.js";

export const Orden = conexionPostgres.define(
   "orden",
   {
      orden_id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
         unique: true,
         field: "orden_id",
      },
      orden_fecha: {
         type: DataTypes.DATE,
         allowNull: false,
         field: "orden_fecha",
      },
      monto_total: {
         type: DataTypes.DECIMAL(10, 2),
         get() {
            // Workaround until sequelize issue #8019 is fixed
            const value = this.getDataValue("monto_total");
            return value === null ? null : parseFloat(value);
         },
         allowNull: false,
         field: "monto_total",
      },
      estado: {
         type: DataTypes.INTEGER,
         defaultValue: 1,
         field: "estado",
      },
      estado_orden: {
         type: DataTypes.STRING(255),
         allowNull: false,
         field: "estado_orden",
      },
   },
   {
      modelName: "orden",
      freezeTableName: true,
   }
);

Usuario.hasMany(Orden, { foreignKey: "comprador_id"});
Orden.belongsTo(Usuario, { foreignKey: "comprador_id", as: "comprador" });

Usuario.hasMany(Orden, { foreignKey: "vendedor_id" });
Orden.belongsTo(Usuario, { foreignKey: "vendedor_id", as: "vendedor" });

MetodoPago.hasMany(Orden, { foreignKey: "metodopago_id"});
Orden.belongsTo(MetodoPago, { foreignKey: "metodopago_id", as: "metodo_pago" });