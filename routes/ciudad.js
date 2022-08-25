import {Router} from "express"
import {ciudadPut,ciudadesdepartamentoGet,ciudadGetListarTodos,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet} from "../controllers/ciudad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";
import HelpersCiudad from "../helpers/ciudad.js"

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
    check('coddepartamento',"el codigo del departamento es obligatoria").not().isEmpty(),
    check('coddepartamento').custom(HelpersCiudad.existedeoartamentoById),
    validarCampos
],ciudadesdepartamentoGet)

router.get("/ciudadnombre",[
    check('codciudad',"el codigo de la ciudad es obligatorio").not().isEmpty(),
    check('codciudad').custom(HelpersCiudad.existeciudadById)
],buscarCiudadNombreGet)

router.get("/departamentonombre",[
    check('departamento',"El nombre del departamento es requerido")
],buscarDepartamentoNombreGet)

router.get("/municipio",[
check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
validarCampos
],buscarCiudadCodigoGet)

export default router