import {Router} from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import{DatosMuestraEnsayoMun, DatosMuestraEnsayo, datosMuestraPost1, muestraCodigoGet, listarMuestrasxIdGet, listarMuestrasGet, editarMuestraPut, activarPut, desactivarPut, buscarFechaGet} from '../controllers/datos-muestra.js'
const router =Router()



router.post('/insertar',[
    validarJWT, 
    check('solicitante').isMongoId(),
    check('solicitante').custom(HerlpersCotizacion.existeCotizacionById),
    check('codMuestra'," es obligatorio").not().isEmpty(),
    check('codMuestra',"El nombre debe tener menos de 15 caracteres").isLength({max:20}),
    check('munRecoleccion'," es obligatorio").not().isEmpty(),
    check('direccionTomaMuestra'," es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra'," es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('muestraRecolectadaPor'," es obligatorio").not().isEmpty(),
    check('muestraRecolectadaPor',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimientoMuestreo'," es obligatorio").not().isEmpty(),
    check('tipoMuestra'," es obligatorio").not().isEmpty(),
    check('tipoMuestra',"El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check('matrizMuestra'," es obligatorio").not().isEmpty(),
    check('matrizMuestra',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check('fechaRecoleccion'," es obligatorio").not().isEmpty(),
    check('cotizacion'," es obligatorio").not().isEmpty(),
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

router.put('/editar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),   
    check('solicitante').isMongoId(),
    check('solicitante').custom(HerlpersCotizacion.existeCotizacionById),
    check('codMuestra'," es obligatorio").not().isEmpty(),
    check('codMuestra',"El nombre debe tener menos de 15 caracteres").isLength({max:20}),
    check('munRecoleccion'," es obligatorio").not().isEmpty(),
    check('direccionTomaMuestra'," es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra'," es obligatorio").not().isEmpty(),
    check('lugarTomaMuestra',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('muestraRecolectadaPor'," es obligatorio").not().isEmpty(),
    check('muestraRecolectadaPor',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimientoMuestreo'," es obligatorio").not().isEmpty(),
    check('tipoMuestra'," es obligatorio").not().isEmpty(),
    check('tipoMuestra',"El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check('matrizMuestra'," es obligatorio").not().isEmpty(),
    check('matrizMuestra',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check('fechaRecoleccion'," es obligatorio").not().isEmpty(),
    check('cotizacion'," es obligatorio").not().isEmpty(),
    check('item').not().isEmpty(),
    validarCampos
],editarMuestraPut)

router.put('/activar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),   
    validarCampos
],activarPut)

router.put('/desactivar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),   
    validarCampos
],desactivarPut)


export default router;