import db from "../config/Database.js";
import {
    Sequelize
} from "sequelize";
import gambarLokasi from "./GambarLokasiModels.js";
import RTB from "./RtbModels.js";

const {
    DataTypes
} = Sequelize;

const FormPermohonan = db.define("permohonan", {
    id_rtb: {
        type: DataTypes.INTEGER,
    },
    id_lokasi: {
        type: DataTypes.INTEGER,
    },
    id_user : {
        type: DataTypes.STRING,

    },
    nama_pemohon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    NIK: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    pekerjaan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    NPWP: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    no_wa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    desa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    maksud_permohonan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    tgl_permohonan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    jumlah_lantai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    luas_bangunan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    file_rpab: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_rpab: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    file_permohonan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_permohonan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    file_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_ktp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    file_npwp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url_npwp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
}, {
    freezeTableName: true
})

FormPermohonan.hasMany(gambarLokasi, {
    foreignKey: "id_lokasi",
});
gambarLokasi.belongsTo(FormPermohonan, {
    foreignKey: "id_lokasi",
});

FormPermohonan.belongsTo(RTB, {
    foreignKey: "id_rtb",
});
RTB.hasMany(FormPermohonan, {
    foreignKey: "id_rtb",
});

export default FormPermohonan;