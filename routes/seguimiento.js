import {Router} from "express"
import {SeguimientosGet,SeguimientosGetNombreoCC,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN} from "../controllers/seguimiento"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/Validar_jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";

const router=Router()

router.post("/",[
 check('codigo').isMongoId(),
//helper validar id existente
check('Datos_del_cliente').isMongoId(),

])
 

         











