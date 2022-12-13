import Ciudad from "../models/ciudad.js"
import Log from "../models/log.js"

const ciudadPost=async(req,res)=>{
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPost = new Ciudad ({coddepartamento,departamento,ciudad,codciudad})
    await ciudadPost.save()
    const idUsuario=req.usuario._id
    const idPost=ciudadPost._id
    const texto=`El usuario: ${req.usuario.nombre} ha agregado la ciudad: ${ciudad}`
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPost,texto,ip})
    await log.save()

    res.json({
        "msg":"Registro Exitoso"
    })
}

const ciudadPut=async(req,res)=>{
    const {id}=req.params
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPut=await Ciudad.findByIdAndUpdate(id,{coddepartamento,departamento,ciudad,codciudad})
    const idUsuario=req.usuario._id
    const idPut=id
    const texto=`El usuario: ${req.usuario.nombre} ha editado la ciudad ${ciudadPut.ciudad}`
    const ip=req.socket.remoteAddress
    const log= new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":`Actualización Exitosa!${ciudadPut}`
    })
}

const ciudadGetListarTodos=async(req,res)=>{
    const ciudad= await Ciudad.find()
    res.json({
        ciudad
    })
}

//listar ciudades de departamento
const ciudadesdepartamentoGet=async(req,res)=>{
    const {coddepartamento}=req.query;
    const departamentos= await Ciudad.find({coddepartamento})
    res.json({departamentos})
}

const buscarCiudadCodigoGet=async(req,res)=>{
    const {codciudad}=req.query;
    const ciudades= await Ciudad.findOne({codciudad})
    res.json({ciudades})
}

const buscarDepartamentoNombreGet=async(req,res)=>{
    const {departamento}=req.query;
    const departamentos= await Ciudad.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { departamento: new RegExp(departamento, "i") },
            ] 
        }
    ) 
    res.json({departamentos})
}

const buscarCiudadNombreGet=async(req,res)=>{
    const {ciudad}=req.query;
    const ciudades = await Ciudad.find(
        //{nombre:new RegExp(query,"i")}
        {
            $or: [
                { ciudad: new RegExp(ciudad, "i") },
            ],
        }
    ) 
    res.json({ciudades})
}

export {ciudadesdepartamentoGet,ciudadGetListarTodos,ciudadPut,ciudadPost,buscarCiudadCodigoGet,buscarCiudadNombreGet,buscarDepartamentoNombreGet}