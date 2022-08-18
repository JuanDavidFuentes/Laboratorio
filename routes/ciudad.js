import {Router} from "express"
import {ciudadPost,ciudadPut,ciudadesdepartamentoGet,ciudadGetListarTodos,buscarCiudadCodigoGet} from "../controllers/ciudad.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router() 

router.post("/",[
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codciudad es obligatorio").not().isEmpty(),
    validarCampos,
],ciudadPost);

router.put("/:id",[
    validarJWT,
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('ciudad',"La ciudad es obligatoria").not().isEmpty(),
    check('codciudad',"El codciudad es obligatorio").not().isEmpty(),
    validarCampos,
],ciudadPut)

router.get("/",[
    
],ciudadGetListarTodos)

router.get("/departamento",[
    
],ciudadesdepartamentoGet)

router.get("/municipio",buscarCiudadCodigoGet)

export default router