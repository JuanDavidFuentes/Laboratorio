import {Router} from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import HerlpersDatosMuestra from "../helpers/datos-muestra.js"
import HerlpersOdenServicio from "../helpers/oden_del_servicio.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import{ DatosMuestraEnsayoMun, DatosMuestraEnsayo, datosMuestraPost1, muestraCodigoGet, listarMuestrasxIdGet, listarMuestrasGet, editarMuestraPut, activarPut, buscarFechaGet} from '../controllers/datos-muestra.js'
import Helperstipo_muestra from "../helpers/tipo_muestra.js";
import HerlpersUsuario from "../helpers/usuarios.js";
const router =Router()



router.post('/insertar',[
    validarJWT, 
    check('solicitante').isMongoId(),
    check('solicitante').custom(HerlpersUsuario.existeUsuarioById),
    check('munRecoleccion'," Municipio de recolleción es obligatorio").not().isEmpty(),
    check('direccionTomaMuestra'," Direccion de la toma de muestras es obligatoria").not().isEmpty(),
    check('lugarTomaMuestra'," Lugar de la toma de muestras es obligatoria").not().isEmpty(),
    check('lugarTomaMuestra',"Lugar de la toma de muestras debe tener menos de 30 caracteres").isLength({max:30}),
    check('muestraRecolectadaPor'," Muestra recolectada por es obligatoria").not().isEmpty(),
    check('muestraRecolectadaPor'," Muestra recolectada por debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimientoMuestreo'," Procedimiento de muestreo es obligatorio").not().isEmpty(),
    check('tipoMuestra'," Tipo de muestra es obligatorio").not().isEmpty(),
    check('tipoMuestra').custom(Helperstipo_muestra.existetipo_muestraById),
    check('matrizMuestra'," Matriz de muestra es obligatoria").not().isEmpty(),
    check('matrizMuestra',"Matriz de muestra tener menos de 20 caracteres").isLength({max:20}),
    check('fechaRecoleccion'," Fecha de recolección es obligatoria").not().isEmpty(),
    check('cotizacion'," Cotización es obligatoria").not().isEmpty(),
    check('item').not().isEmpty(),
    validarCampos
], datosMuestraPost1)

router.get('/codigo',[
    validarCampos
],muestraCodigoGet)

router.get('/MuestrasConEnsayo',DatosMuestraEnsayo)

router.get('/b',buscarFechaGet) 

router.get('/ensayoMunicipio', DatosMuestraEnsayoMun)

router.get('/listarId/:id',[
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),   
    validarCampos
],listarMuestrasxIdGet)

router.get('/listarMuestras',listarMuestrasGet)

router.put('/desactivar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),   
    validarCampos
],editarMuestraPut)

router.put('/activar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersOdenServicio.existeOrdenById),   
    validarCampos
],activarPut)




export default router;