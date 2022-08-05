import {Router} from "express"
import { check } from "express-validator";
import { activarPut, buscarInformeRPorCodigoDeMuestraGet, buscarInformeRPorNombreDelUsuarioGet, desactivarPut, editarInformeResultadosPut, insertarInformeRPost, listarTodosLosInformes } from "../controllers/informe-resultados.js";
import HerlpersDatosMuestra from "../helpers/datos-muestra.js";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router()
    
router.post('/',[
    validarJWT,
    check('fecha_Hora_recepcion_muestras').isMongoId(),
    check()
    // validarCampos
],insertarInformeRPost)

router.get('/',listarTodosLosInformes)

router.get('/nombre',buscarInformeRPorNombreDelUsuarioGet)

router.get('/codigo',buscarInformeRPorCodigoDeMuestraGet)

router.put('/',[],editarInformeResultadosPut)

router.put('/',activarPut)

router.put('/',desactivarPut)

export default router;