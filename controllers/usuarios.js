import Usuario from "../models/usuarios.js"
import bcryptjs from "bcryptjs"
import {generarJWT} from "../middlewares/validar_jwt.js"
import { v2 as cloudinary } from 'cloudinary'

const usuarioPost=async(req,res)=>{
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,contacto,telefono,email,password,rol}=req.body
    const salt=bcryptjs.genSaltSync(10)
    const usuario = new Usuario ({tipoPersona,nombre,apellidos,documento,direccion,ciudad,contacto,telefono,email,password,rol})
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()

    res.json({ 
        msg:"Registro Exitoso"
    })
}

const usuarioLogin=async(req, res)=>{
    const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
}

const usuarioGetListarTodos=async(req,res)=>{
    const usuarios= await Usuario.find()
    res.json({
        usuarios
    })
}

const usuarioGetListarid=async(req,res)=>{
    const {id}=req.params
    const usuario =await Usuario.findById(id)
    res.json({
        usuario
    })
}

const usuarioGetListarNombre=async(req, res)=>{
    const {nombre}=req.query;
    const usuario=await Usuario.findOne({nombre})
    
    res.json({
        usuario
    })
}

const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params

    try {
        let usuario = await Usuario.findById(id)
        if (usuario.foto) {
            return res.json({ url: usuario.foto })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const cargarArchivoCloudPut= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let usuario = await Usuario.findById(id);
                    if (usuario.foto) {
                        const nombreTemp = usuario.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    usuario = await Usuario.findByIdAndUpdate(id, { foto: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const usuarioPutdatos=async(req,res)=>{
    const {id}=req.params
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,contacto,telefono,email,password,rol}=req.body
    
    const UsuarioEditarDatos=await Usuario.findByIdAndUpdate(id,{tipoPersona,nombre,apellidos,documento,direccion,ciudad,contacto,telefono,email,password,rol})
    res.json({
        "msg":'Actualizacion realizada con exito'
    })
}

const usuarioPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Usuario.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"Usuario activado con exito"
    })
}

const usuarioPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Usuario.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"Usuario desactivado con exito"
    })
}


// API USUARIOS: debe permitir: 
// GET Listar todos los usuario✅
// GET Listar usuario por id✅
// GET Buscar usuario por nombre ✅
// GET Mostrar foto usuario "✅"
// POST Insertar usuario ✅
// POST Login✅
// PUT Editar foto usuario ✅ Agregar foto del usuario "✅"
// PUT Modificar datos del usuario✅
// PUT Activar usuario✅
// PUT Inactivar usuario✅

export {usuarioPost,usuarioPutdatos,usuarioPutActivar,usuarioPutDesactivar,cargarArchivoCloudPut,usuarioLogin,usuarioGetListarTodos,mostrarImagenCloud,usuarioGetListarid,usuarioGetListarNombre}