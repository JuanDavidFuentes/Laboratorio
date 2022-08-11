import {Router} from "express"
import { check } from "express-validator";
import HerlpersCotizacion from "../helpers/cotizacion.js"
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import { activarPut, buscarPorCodigoGet, buscarPorNombreGet, cotizacionPost, desactivarPut, editarCotizacionPut, listarcotizacionesGet, crearConsecutivo } from "../controllers/cotizacion.js";

const router=Router()
router.post("/",[
    // validarJWT,
    // check('datos_cliente').isMongoId(),
    // check('datos_cliente').custom(HerlpersUsuario.existeUsuarioById),
    // check('validez_oferta','La validez de oferta es obligatoria').not().isEmpty(),
    // check('elabordo_por').isMongoId(),
    // check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    // check('items').custom(HerlpersCotizacion.items),
    // check('observaciones_propuesta_tecnica_economica',"Las observaciones_propuesta_tecnica_economica es obligatoria"),
    // check('subtotal',"El subtotal es obligatoro").not().isEmpty(),
    // check('subtotal',"El subtotal debe de ser numerico").isNumeric(),
    // check('iva',"El iva es obligatoro").not().isEmpty(),
    // check('iva',"El iva debe de ser numerico").isNumeric(),
    // check('total','El total es obligatoro').not().isEmpty(),
    // check('total',"El total debe de ser numerico").isNumeric(),
    // check('medio_solicitud',"El medio_solicitud es obligatoro").not().isEmpty(),
    // check('medio_solicitud',"El medio_solicitud debe de tener menos de 100 caracteres").isLength({max:100}),
    // validarCampos
],cotizacionPost);


router.post('/CrearConsecutivo',[
    // validarJWT,
    check('numero_cotizacion',"El numero de cotizacion es requerido").not().isEmpty(),
    validarCampos
],crearConsecutivo)

router.get('/',listarcotizacionesGet)

router.get('/buscarCodigo',[
    // validarJWT,
    check('numero_cotizacion',"El numero de cotizacion es requerido").not().isEmpty(),
    check('numero_cotizacion').custom(HerlpersCotizacion.existeNumeroCotizacion),
    validarCampos
],buscarPorCodigoGet)

router.get('/buscarNombre/:id',[
    // validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],buscarPorNombreGet)

router.put("/:id",[
    // validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    check('numero_cotizacion',"El numero de cotizacion es requerido").not().isEmpty(),
    check('numero_cotizacion',"El numero de cotizacion debe de tener menos de 100 caracteres ").isLength({max:100}),
    check('datos_cliente').isMongoId(),
    check('datos_cliente').custom(HerlpersUsuario.existeUsuarioById),
    check('validez_oferta','La validez de oferta es obligatoria').not().isEmpty(),
    check('elabordo_por').isMongoId(),
    check('elabordo_por').custom(HerlpersUsuario.existeUsuarioById),
    check('items').custom(HerlpersCotizacion.items),
    check('observaciones_propuesta_tecnica_economica',"Las observaciones_propuesta_tecnica_economica es obligatoria"),
    check('subtotal',"El subtotal es obligatoro").not().isEmpty(),
    check('subtotal',"El subtotal debe de ser numerico").isNumeric(),
    check('iva',"El iva es obligatoro").not().isEmpty(),
    check('iva',"El iva debe de ser numerico").isNumeric(),
    check('total','El total es obligatoro').not().isEmpty(),
    check('total',"El total debe de ser numerico").isNumeric(),
    check('medio_solicitud',"El medio_solicitud es obligatoro").not().isEmpty(),
    check('medio_solicitud',"El medio_solicitud debe de tener menos de 100 caracteres").isLength({max:100}),
    validarCampos
],editarCotizacionPut);

router.put('/activar/:id',[
    // validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
],activarPut)

router.put('/desactivar/:id',[
    // validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos
],desactivarPut)
export default router;