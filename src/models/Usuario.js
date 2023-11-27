import { DataTypes } from "sequelize"
import { conexionPostgres } from "../config/sequelize.js"
import { Direccion } from "./Direccion.js";

export const Usuario = conexionPostgres.define("usuario",{
    usuario_id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        field: "usuario_id",
    },
    nombre:{
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "nombre",
    },
    apellido:{
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "apellido",
    },
    dni:{
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        field: "dni",
    },
    correo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "correo",
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password",
    },
    telefono: {
        type: DataTypes.STRING(9),
        field: "telefono",
    },
    fotoperfil:{
        type: DataTypes.STRING(20000),
        field: "fotoperfil",
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: "estado",
    },
},{
    timestamps: false,
    tableName: "usuario",
    freezeTableName: true,
})

Usuario.hasMany(Direccion, { foreignKey: "usuario_id", as:"direccion" });
Direccion.belongsTo(Usuario, { foreignKey: "usuario_id", as:"direccion"});