import db from "../config/Database.js";
import {
    Sequelize
} from "sequelize";

const {
    DataTypes
} = Sequelize;

const gambarLokasi = db.define("gambar_lokasi", {
    file_gambar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_gambar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
}, {
    freezeTableName : true
})



export default gambarLokasi;