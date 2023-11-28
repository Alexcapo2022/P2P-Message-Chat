import { Orden } from "./Orden.js";
import { Libro } from "./Libro.js";

export const OrdenDetalle = sequelize.define('OrdenDetalle', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  OrdenDetalle.belongsTo(Orden, { foreignKey: 'orden_id' });
  OrdenDetalle.belongsTo(Libro, { foreignKey: 'libro_id' });