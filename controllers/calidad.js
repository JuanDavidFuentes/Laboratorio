import Calidad from "../models/calidad.js"
import Log from "../models/log.js"


const listadoPost=async(req,res)=>{
    const {ListadoMuestras,InformeResultado,RecepcionMuestras,OrdenServicio,InstructivoTomaMuestras,Seguimiento,OfertaServicios}=req.body;
    const listado = new Calidad ({ListadoMuestras,InformeResultado,RecepcionMuestras,OrdenServicio,InstructivoTomaMuestras,Seguimiento,OfertaServicios})
    await listado.save()
    res.json(listado)
}

const listadoPut=async(req,res)=>{
    const {id}=req.params
    const {listadoMuestras,InformeResultado,RecepcionMuestras,OrdenServicio,InstructivoTomaMuestras,Seguimiento,OfertaServicios}=req.body
    const listado = await Calidad.findByIdAndUpdate(id,{listadoMuestras,InformeResultado,RecepcionMuestras,OrdenServicio,InstructivoTomaMuestras,Seguimiento,OfertaServicios})
    await listado.save()
    const idUsuario=req.usuario._id
    const idPut=id
    const texto=`El usuario: ${req.usuario.nombre} ha editado la calidad`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()

    res.json({
        "msg":"Cambio realizado con exito"
    })
}

const listarGet=async(req, res)=>{
    const listado=await Calidad.find()
    res.json({
        listado
    })
}


export{listadoPut,listarGet,listadoPost}