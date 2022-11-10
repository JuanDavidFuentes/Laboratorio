import { Router } from "express";
import { coloresPost, coloresPut, coloresGet } from "../controllers/colores.js";

const router=Router()

router.post('/', coloresPost)

router.put('/:id', coloresPut)

router.get('/', coloresGet)

export default router