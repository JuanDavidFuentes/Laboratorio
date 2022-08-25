import { Router } from "express";
import {SeguimientosGet,SeguimientosGetNombreoCC,SeguimientoPost,SeguimientoPutdatos,SeguimientoGetN} from "../controllers/seguimiento.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/Validar_jwt.js";
import HelpersInformeR from "../helpers/informe_resultados.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import HerlpersCotizacion from "../helpers/cotizacion.js";

const router = Router();

router.post("/", [
    check('Codigo').isMongoId(), //informeR
    check('Codigo').custom(HelpersInformeR.existeinformeById),
    check('Datos_del_cliente').isMongoId(), //Usuario
    check('Datos_del_cliente').custom(HerlpersUsuario.existeUsuarioById),
    check('Datos_del_contacto').isMongoId(), //Usuario
    check('Datos_del_contacto').custom(HerlpersUsuario.existeUsuarioById),
    check('Solicitud').not().isEmpty(),
    check('Medio_de_solicitud').isMongoId(), //Cotizacion
    check('Medio_de_solicitud').custom(HerlpersCotizacion.existeCotizacionById),
    check('Recibido_por').isMongoId(), //Usuario
    check('Recibido_por').custom(HerlpersUsuario.existeUsuarioById),
    check('Porcentaje_de_Aceptacion').not().isEmpty(),
    check('Registro_de_Aceptacion').not().isEmpty(),
    check('Motivo_de_Rechazo').not().isEmpty(),
    check('Seguimiento_de_Cotizaciones').isMongoId(), //Cotizacion
    check('Seguimiento_de_Cotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
    validarCampos,
],SeguimientoPost);

// GET listar seguimiento por nombre o cc de usuario
router.get("/",[
    check("valorBuscar").not().isEmpty()
],SeguimientosGetNombreoCC); //REVISAR

// GET Listar todos los seguimientos
router.get("/seguimientos", SeguimientosGet);

// GET Buscar seguimiento por #N resultado
router.get("/segimientoN", [
    check("Codigo").not().isEmpty()
], SeguimientoGetN); //REVISAR

router.put("/:id", [
  validarJWT,
  check('id').isMongoId(),
  check('Codigo').isMongoId(), //informeR
  check('Codigo').custom(HelpersInformeR.existeinformeById),
  check('Datos_del_cliente').isMongoId(), //Usuario
  check('Datos_del_cliente').custom(HerlpersUsuario.existeUsuarioById),
  check('Datos_del_contacto').isMongoId(), //Usuario
  check('Datos_del_contacto').custom(HerlpersUsuario.existeUsuarioById),
  check('Solicitud').not().isEmpty(),
  check('Medio_de_solicitud').isMongoId(), //Cotizacion
  check('Medio_de_solicitud').custom(HerlpersCotizacion.existeCotizacionById),
  check('Recibido_por').isMongoId(), //Usuario
  check('Recibido_por').custom(HerlpersUsuario.existeUsuarioById),
  check('Porcentaje_de_Aceptacion').not().isEmpty(),
  check('Registro_de_Aceptacion').not().isEmpty(),
  check('Motivo_de_Rechazo').not().isEmpty(),
  check('Seguimiento_de_Cotizaciones').isMongoId(), //Cotizacion
  check('Seguimiento_de_Cotizaciones').custom(HerlpersCotizacion.existeCotizacionById),
  validarCampos,
],SeguimientoPutdatos);

export default router