import {Router} from "express"
import {ciudadPut,ciudadesdepartamentoGet,ciudadGetListarTodos,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet} from "../controllers/ciudad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HerlpersCiudad from "../helpers/ciudad.js"

const router=Router() 

router.put("/:id",[
    validarJWT,
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codciudad es obligatorio").not().isEmpty(),
    validarCampos,
],ciudadPut)

router.get("/CiudadDepartamento",ciudadGetListarTodos)

router.get("/departamento",[
    check('coddepartamento',"La ciudad es obligatoria").not().isEmpty(),
    check('coddepartamento').custom(HerlpersCiudad.existedeoartamentoById),
    validarCampos
],ciudadesdepartamentoGet)

router.get("/ciudadnombre",buscarCiudadNombreGet)

router.get("/departamentonombre",buscarDepartamentoNombreGet)

router.get("/municipio",[
check('codciudad',"La ciudad es obligatoria").not().isEmpty(),
check('codciudad').custom(HerlpersCiudad.existeciudadById),
validarCampos
],buscarCiudadCodigoGet)

export default router