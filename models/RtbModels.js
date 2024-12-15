import db from "../config/Database.js";
import {
    Sequelize
} from "sequelize";

const {
    DataTypes
} = Sequelize;

const RTB = db.define("rtb", {
    file_rtb: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_rtb: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
}, {
    freezeTableName : true
})



export default RTB;