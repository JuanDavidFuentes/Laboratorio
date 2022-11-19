import Usuario from "../models/usuarios.js"
import bcryptjs from "bcryptjs"
import {generarJWT} from "../middlewares/validar_jwt.js"
import { v2 as cloudinary } from 'cloudinary'
import Log from "../models/log.js"

const usuarioPost=async(req,res)=>{
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto}=req.body
    const salt=bcryptjs.genSaltSync(10)
    const usuario = new Usuario ({tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto})
    usuario.email=email.toUpperCase()
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()
    const idUsuario=usuario._id
    const idPost=usuario._id
    const texto=`El usuario ${nombre} ha sido creado por ${req.usuario.nombre}`
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPost,texto,ip})
    await log.save()
    res.json({
        msg:"Registro Exitoso",
        usuario
    })
}

const usuarioPutdatos=async(req,res)=>{
    const {id} =req.params
    const {tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto}=req.body
    let salt=bcryptjs.genSaltSync(10)
    const usuario = await Usuario.findByIdAndUpdate(id,{tipoPersona,nombre,apellidos,documento,direccion,ciudad,celular,telefono,cargo,email,password,rol,contacto})
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha editado a un usuario`
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,texto,ip})
    await log.save()

    res.json({
        usuario
    })
}

const usuarioPutRol=async(req,res)=>{
    const {id} =req.params
    const {rol}=req.body
    const usuario = await Usuario.findByIdAndUpdate(id,{rol})
    await usuario.save()
    const idUsuario=req.usuario._id
    const idPut= id
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        usuario
    })
}

const usuarioLogin=async(req, res)=>{
    const {email, password} = req.body;
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
            const idUsuario=usuario._id
            const idPost=usuario._id
            const texto=`El usuario: ${usuario.nombre} ha iniciado sesión`
            const navegador=req.headers['user-agent']
            const ip=req.socket.remoteAddress
            const log= new Log({idUsuario,idPost,navegador,texto,ip})
            await log.save()
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
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}

const usuarioGetListarTodosContactos=async(req,res)=>{
    const usuarios= await Usuario.find({rol:"CONTACTO"})
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}

const usuarioGetListarTodosUsuariosmenoslosclientesporquejholmannoquierequelollamecomolollame=async(req,res)=>{
    const usuarios= await Usuario.find({$and:[{rol:{$ne:"CLIENTE"}},{rol:{$ne:"CONTACTO"}}]})
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}

const usuarioGet=async(req,res)=>{
    const usuarios= await Usuario.find({$or:[{rol:"CLIENTE"},{rol:"CONTACTO"}]})
    .populate({
        path:"contacto",
    })
    .populate({
        path:"ciudad",
    })
    res.json({
        usuarios
    })
}

const usuarioGetListarTodosClientes=async(req,res)=>{
    const usuarios= await Usuario.find({rol:"CLIENTE"})
    .populate({
        path:"ciudad",
    })
    .populate({
        path:"contacto",
        populate:{
            path:"ciudad"
        }
    })
    res.json({
        usuarios
    })
}

const usuarioGetListarid=async(req,res)=>{
    const {id}=req.params
    const usuario =await Usuario.findOne({id})
    res.json({
        usuario
    })
}


const usuarioGetListarNombre=async(req, res)=>{
    const {nombre}=req.query;
    const nombres = await Usuario.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { nombre: new RegExp(nombre, "i") },
            ]
        }
    ) 
    res.json({nombres})
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

//subir img
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
                    const idUsuario=req.usuario._id
                    const idPut= id
                    const ip=req.socket.remoteAddress
                    const log=new Log({idUsuario,idPut,ip})
                    await log.save()
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

const usuarioPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Usuario.findByIdAndUpdate(id,{estado:1})
    const idUsuario=req.usuario._id
    const idPut=id
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        "msg":"Usuario activado con exito",
        activar
    })
}

const usuarioPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Usuario.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut=id
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,ip})
    await log.save()
    res.json({
        "msg":"Usuario desactivado con exito",
        desactivar
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

export {usuarioGet,usuarioGetListarTodosUsuariosmenoslosclientesporquejholmannoquierequelollamecomolollame,usuarioGetListarTodosContactos,usuarioGetListarTodosClientes,usuarioPost,usuarioPutdatos,usuarioPutRol,usuarioPutActivar,usuarioPutDesactivar,cargarArchivoCloudPut,usuarioLogin,usuarioGetListarTodos,mostrarImagenCloud,usuarioGetListarid,usuarioGetListarNombre}