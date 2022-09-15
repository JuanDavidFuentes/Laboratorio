import {Router} from "express"
import {listarGet,listadoPut} from "../controllers/calidad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router() 
router.put("/calidadPut",[

],listadoPut)

router.get("/listar",listarGet)

export default router