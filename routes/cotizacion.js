import { Router } from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import {reiniciar,activarPutR,listarTodasCotizacionesEnProceso,listarTodasCotizacionesGet,Bitacora, ListarConsecutivo, infoCali, actualizarInfo, buscarPorId, activarPut, buscarFechaGet, buscarPorCodigoGet, buscarPorIdClienteGet, cotizacionPost, desactivarPut, editarCotizacionPut, listarcotizacionesGet, crearConsecutivo } from "../controllers/cotizacion.js";

const router = Router()
router.put('/actualizarInfo/:id', [
    validarJWT,
    check('iva',"El iva es obligatorio").not().isEmpty(),
    check('iva',"El iva debe de ser numerico").isNumeric(),
    check('descripcion',"La descripción es obligatoria").not().isEmpty(),
    check('nit',"El nit es obligatorio").not().isEmpty(),
    check('direccion',"La dirección es obligatoria").not().isEmpty(),
    check('telefono',"El telefono es obligatorio").not().isEmpty(),
    check('correo',"El correo es obligatorio").not().isEmpty(),
    validarCampos,
], actualizarInfo)

router.put('/reiniciar/:id', reiniciar)

router.get('/traerInfo',infoCali)

router.get('/traerBitacora',Bitacora)

router.get('/traerConsecutivo',ListarConsecutivo)

router.post("/", [
    validarJWT,
    check('idCliente').isMongoId(),
    check('idCliente').custom(HerlpersUsuario.existeUsuarioById),
    // check('idContacto').isMongoId(),
    // check('idContacto').custom(HerlpersUsuario.existeUsuarioById),
    check('fecha_emision', "La fecha de fecha de emision es obligatoria").not().isEmpty(),     
    check('fecha_emision', "La fecha de fecha de emision debe de ser tipo fecha").isDate(),
    check('validez_oferta', "La fecha de validez de oferta es obligatoria").not().isEmpty(),
    check('validez_oferta', "La fecha de validez de oferta debe de ser tipo fecha").isDate(),
    check('entrega_resultados', "La fecha de entrega de resultados es obligatoria").not().isEmpty(),
    check('entrega_resultados', "La fecha de entrega de resultados debe de ser tipo fecha").isDate(),
    check('elabordo_por').isMongoId(),
    check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    check('items').custom(HerlpersCotizacion.items),
    // check('observaciones', "Las observaciones es obligatoria"),
    check('subtotal', "El subtotal es obligatoro").not().isEmpty(),
    check('subtotal', "El subtotal debe de ser numerico").isNumeric(),
    check('descuento', "El descuento es obligatoro").not().isEmpty(),
    check('descuento', "El descuento debe de ser numerico").isNumeric(),
    check('iva', "El iva es obligatoro").not().isEmpty(),
    check('iva', "El iva debe de ser numerico").isNumeric(),
    check('total', 'El total es obligatoro').not().isEmpty(),
    check('total', "El total debe de ser numerico").isNumeric(),
    validarCampos
], cotizacionPost);
   
router.get('/a', buscarFechaGet)

router.get('/listarTodasLasCotizaciones', listarcotizacionesGet)

router.get('/listarLasCotizacionesAD', listarTodasCotizacionesGet)

router.get('/cotisEnProceso',listarTodasCotizacionesEnProceso)

router.post('/CrearConsecutivo', [
    validarJWT,
    check('numero_cotizacion', "El numero de cotizacion es requerido").not().isEmpty(),
    validarCampos
], crearConsecutivo)

// router.get('/',buscarPorId) //ruta de andres

router.get('/listarporIdCoti/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], buscarPorId)

router.get('/buscarCodigo', [      
    validarJWT,     
    check('numero_cotizacion', "El numero de cotizacion es requerido").not().isEmpty(),
    check('numero_cotizacion').custom(HerlpersCotizacion.existeNumeroCotizacion),
    validarCampos
], buscarPorCodigoGet)

router.get('/buscarNombre/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
], buscarPorIdClienteGet)

router.put("/:id", [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    check('idCliente').isMongoId(),
    check('idCliente').custom(HerlpersUsuario.existeUsuarioById),
    // check('idContacto').isMongoId(),
    // check('idContacto').custom(HerlpersUsuario.existeUsuarioById),
    check('validez_oferta', "La fecha de validez de oferta es obligatoria").not().isEmpty(),
    check('validez_oferta', "La fecha de validez de oferta es obligatoria debe de ser tipo fecha").isDate(),
    check('entrega_resultados', "La fecha de entrega de resultados").not().isEmpty(),
    check('entrega_resultados', "La fecha de entrega de resultados debe de ser tipo fecha").isDate(),
    check('elabordo_por').isMongoId(),
    check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    check('items').custom(HerlpersCotizacion.items),
    // check('observaciones', "Las observaciones es obligatoria"),
    check('subtotal', "El subtotal es obligatoro").not().isEmpty(),
    check('subtotal', "El subtotal debe de ser numerico").isNumeric(),
    check('descuento', "El descuento es obligatoro").not().isEmpty(),
    check('descuento', "El descuento debe de ser numerico").isNumeric(),
    check('iva', "El iva es obligatoro").not().isEmpty(),
    check('iva', "El iva debe de ser numerico").isNumeric(),
    check('total', 'El total es obligatoro').not().isEmpty(),
    check('total', "El total debe de ser numerico").isNumeric(),
    validarCampos
], editarCotizacionPut);

router.put('/activar/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], activarPut)

router.put('/activar2/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], activarPutR)

router.put('/desactivar/:id', [
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
], desactivarPut)

export default router;