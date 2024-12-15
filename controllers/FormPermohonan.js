import FormPermohonan from "../models/FormPermohonanModel.js";
import path from "path";
import upload from "../config/MulterConfig.js";
import {
    promisify
} from "util";
import fs from "fs";

export const getFormPermohonan = async (req, res) => {
    try {
        const response = await FormPermohonan.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({
            msg: "Data Tidak Ada"
        });
    }
};

export const getFormPermohonanById = async (req, res) => {
    try {
        const response = await FormPermohonan.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({
            msg: "Data Tidak Ada"
        });
    }
};

export const createFormPermohonan = async (req, res) => {
    const {
        id_user,
        id_rtb,
        id_lokasi,
        nama_pemohon,
        NIK,
        pekerjaan,
        NPWP,
        no_wa,
        alamat,
        kecamatan,
        desa,
        maksud_permohonan,
        tgl_permohonan,
        jumlah_lantai,
        luas_bangunan,
    } = req.body;
    
    console.log(
          id_user,
          id_rtb,
          id_lokasi,
          nama_pemohon,
          NIK,
          pekerjaan,
          NPWP,
          no_wa,
          alamat,
          kecamatan,
          desa,
          maksud_permohonan,
          tgl_permohonan,
          jumlah_lantai,
          luas_bangunan,
        );
  const uploadFiles = upload.fields([
    { name: 'file_rpab', maxCount: 1 },
    { name: 'file_ktp', maxCount: 1 },
    { name: 'file_npwp', maxCount: 1 },
]);

  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(422).json({ msg: err.message });
    }
    try {
      await FormPermohonan.create({
        id_user,
        id_rtb,
        id_lokasi,
        nama_pemohon,
        NIK,
        pekerjaan,
        NPWP,
        no_wa,
        alamat,
        kecamatan,
        desa,
        maksud_permohonan,
        tgl_permohonan,
        jumlah_lantai,
        luas_bangunan,
        file_rpab: req.files.file_rpab ? req.files.file_rpab[0].filename : null,
        file_ktp: req.files.file_ktp ? req.files.file_ktp[0].filename : null,
        file_npwp: req.files.file_npwp ? req.files.file_npwp[0].filename : null,
      });
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};


export const updateFormPermohonan = async (req, res) => {
    const {
        id
    } = req.params;

    const formPermohonan = await FormPermohonan.findByPk(id);
    if (!formPermohonan) return res.status(404).json({
        msg: "Data not found"
    });

    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({
            msg: "No File Uploaded"
        });

    const {
        id_rtb,
        id_user,
        id_lokasi,
        nama_pemohon,
        NIK,
        pekerjaan,
        NPWP,
        no_wa,
        alamat,
        kecamatan,
        desa,
        maksud_permohonan,
        tgl_permohonan,
        jumlah_lantai,
        luas_bangunan,
    } = req.body;

    const {
        file_rpab,
        file_permohonan,
        file_ktp,
        file_npwp
    } = req.files;

    const now = new Date();
    const detik = now.getSeconds();

    const fotoRPAB = file_rpab;
    const fotoPermohonan = file_permohonan;
    const fotoKTP = file_ktp;
    const fotoNPWP = file_npwp;

    const extRPAB = path.extname(fotoRPAB.name);
    const extPermohonan = path.extname(fotoPermohonan.name);
    const extKTP = path.extname(fotoKTP.name);
    const extNPWP = path.extname(fotoNPWP.name);

    const fileRPAB = detik + fotoRPAB.md5 + extRPAB;
    const filePermohonan = detik + fotoPermohonan.md5 + extPermohonan;
    const fileKTP = detik + fotoKTP.md5 + extKTP;
    const fileNPWP = detik + fotoNPWP.md5 + extNPWP;

    const urlRPAB = `${req.protocol}://${req.get("host")}/img/${fileRPAB}`;
    const urlPermohonan = `${req.protocol}://${req.get("host")}/img/${filePermohonan}`;
    const urlKTP = `${req.protocol}://${req.get("host")}/img/${fileKTP}`;
    const urlNPWP = `${req.protocol}://${req.get("host")}/img/${fileNPWP}`;

    const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"];
    if (
        !allowedTypes.includes(extRPAB.toLowerCase()) ||
        !allowedTypes.includes(extPermohonan.toLowerCase()) ||
        !allowedTypes.includes(extKTP.toLowerCase()) ||
        !allowedTypes.includes(extNPWP.toLowerCase())
    )
        return res.status(422).json({
            msg: "Invalid file types"
        });

    const fileSizes = [
        fotoRPAB.data.length,
        fotoPermohonan.data.length,
        fotoKTP.data.length,
        fotoNPWP.data.length,
    ];

    if (fileSizes.some((size) => size > 5000000)) {
        return res.status(422).json({
            msg: "File must be less than 5MB"
        });
    }

    try {
        await Promise.all([
            promisify(fotoRPAB.mv)(`./public/img/${fileRPAB}`),
            promisify(fotoPermohonan.mv)(`./public/img/${filePermohonan}`),
            promisify(fotoKTP.mv)(`./public/img/${fileKTP}`),
            promisify(fotoNPWP.mv)(`./public/img/${fileNPWP}`),
        ]);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: err.message
        });
    }

    try {
        await formPermohonan.update({
            id_rtb,
            id_user,
            id_lokasi,
            nama_pemohon,
            NIK,
            pekerjaan,
            NPWP,
            no_wa,
            alamat,
            kecamatan,
            desa,
            maksud_permohonan,
            tgl_permohonan,
            jumlah_lantai,
            luas_bangunan,
            file_rpab: fileRPAB,
            file_permohonan: filePermohonan,
            file_ktp: fileKTP,
            file_npwp: fileNPWP,
            url_rpab: urlRPAB,
            url_permohonan: urlPermohonan,
            url_ktp: urlKTP,
            url_npwp: urlNPWP,
        });
        res.status(200).json({
            message: "Data successfully updated",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
};

export const deleteFormPermohonan = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const formPermohonan = await FormPermohonan.findOne({
            where: {
                id: id,
            },
        });

        if (!formPermohonan) {
            return res.status(404).json({
                msg: "Data tidak ditemukan"
            });
        }

        fs.unlinkSync(`./public/img/${formPermohonan.file_rpab}`);
        fs.unlinkSync(`./public/img/${formPermohonan.file_permohonan}`);
        fs.unlinkSync(`./public/img/${formPermohonan.file_ktp}`)
        fs.unlinkSync(`./public/img/${formPermohonan.file_npwp}`)

        if (!formPermohonan) {
            return res.status(404).json({
                msg: "Data Not Found"
            });
        }

        await formPermohonan.destroy();

        res.status(200).json({
            message: "Data successfully deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};