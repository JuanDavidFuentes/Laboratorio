import {Router} from "express"
import {departamentoPost,departamentoput} from "../controllers/departamento.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar_jwt.js";

const router=Router() 

router.post("/",[
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('departamento',"El departamento es obligatorio").not().isEmpty(),
    validarCampos,
],departamentoPost);

router.put("/",[
    check('coddepartamento',"El coddepartamento es obligatorio").not().isEmpty(),
    check('departamento',"El departamento es obligatorio").not().isEmpty(),
    validarCampos,
],departamentoput)


export default router;