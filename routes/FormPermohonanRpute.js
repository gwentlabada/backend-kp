import express from "express"
import { getFormPermohonan, getFormPermohonanById, createFormPermohonan, updateFormPermohonan, deleteFormPermohonan } from "../controllers/FormPermohonan.js"

const router = express.Router();

router.get("/permohonan", getFormPermohonan)
router.get("/permohonan/:id", getFormPermohonanById)
router.post("/permohonan", createFormPermohonan)
router.patch("/permohonan/:id", updateFormPermohonan)
router.delete("/permohonan/:id", deleteFormPermohonan)

export default router