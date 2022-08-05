import {Router} from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/Validar_jwt.js";
import{datosMuestraPost, muestraCodigoGet, listarMuestrasxIdGet, listarMuestrasGet, editarMuestraPut, activarPut, desactivarPut} from '../controllers/datos-muestra.js'
const router =Router()



router.post('/insertar',[
    validarJWT,
    check('id_cotizacion').isMongoId(),
    check('id_cotizacion').custom(HerlpersCotizacion.existeCotizacionById),
    check('codigo_muestra'," es obligatorio").not().isEmpty(),
    check('codigo_muestra',"El nombre debe tener menos de 15 caracteres").isLength({max:20}),
    check('municipio_recoleccion'," es obligatorio").not().isEmpty(),
    check('direccion_toma'," es obligatorio").not().isEmpty(),
    check('recoletada_por'," es obligatorio").not().isEmpty(),
    check('recoletada_por',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimiento'," es obligatorio").not().isEmpty(),
    check('tipo_muestra'," es obligatorio").not().isEmpty(),
    check('tipo_muestra',"El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check('matriz_muestra'," es obligatorio").not().isEmpty(),
    check('matriz_muestra',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check('fecha_recoleccion'," es obligatorio").not().isEmpty(),
    check('observaciones'," es obligatorio").not().isEmpty(),
    check('entregada_por').isMongoId(),
    check('cedula').isMongoId(),
    check('fecha_recepcion_muestra'," es obligatorio").not().isEmpty(),
    check('recibida_por').isMongoId(),
    check('foto').isMongoId(),
    validarCampos
], datosMuestraPost)

router.get('/codigo',[
    validarCampos
],muestraCodigoGet)
    

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
    check('id_cotizacion').isMongoId(),
    check('id_cotizacion').custom(HerlpersCotizacion.existeCotizacionById),
    check('codigo_muestra'," es obligatorio").not().isEmpty(),
    check('codigo_muestra',"El nombre debe tener menos de 15 caracteres").isLength({max:20}),
    check('municipio_recoleccion'," es obligatorio").not().isEmpty(),
    check('direccion_toma'," es obligatorio").not().isEmpty(),
    check('recoletada_por'," es obligatorio").not().isEmpty(),
    check('recoletada_por',"El nombre debe tener menos de 30 caracteres").isLength({max:30}),
    check('procedimiento'," es obligatorio").not().isEmpty(),
    check('tipo_muestra'," es obligatorio").not().isEmpty(),
    check('tipo_muestra',"El nombre debe tener menos de 15 caracteres").isLength({max:15}),
    check('matriz_muestra'," es obligatorio").not().isEmpty(),
    check('matriz_muestra',"El nombre debe tener menos de 20 caracteres").isLength({max:20}),
    check('fecha_recoleccion'," es obligatorio").not().isEmpty(),
    check('observaciones'," es obligatorio").not().isEmpty(),
    check('entregada_por').isMongoId(),
    check('cedula').isMongoId(),
    // check('firma').isMongoId(),
    check('fecha_recepcion_muestra'," es obligatorio").not().isEmpty(),
    check('recibida_por').isMongoId(),
    check('foto').isMongoId(),
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