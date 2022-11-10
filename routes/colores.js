import { Router } from "express";
import { coloresPost, coloresPut } from "../controllers/colores.js";

const router=Router()

router.post('/', coloresPost)

router.put('/', coloresPut)

export default router