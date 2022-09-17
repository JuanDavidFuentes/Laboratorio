import Cotizacion from "../models/cotizacion.js";
import Consecutivo from "../models/consecutivo.js";
import Log from "../models/log.js";
import calidad from "../models/calidad.js";



const infoCali=async(req,res)=>{
    const info= await Consecutivo.find()
    res.json({
        info
    })
}

///ej: 0001-2022V1 
const numeros=(numero_cotizacion)=>{
    if(numero_cotizacion){
        let date = new Date();
        let output = String(date.getFullYear());
        if(numero_cotizacion.toString().length===1){
           return `000${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===2){
            return `00${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===3){
            return `0${numero_cotizacion}-${output}V${1}`
        }else if (numero_cotizacion.toString().length===4){
            return `${numero_cotizacion}-${output}V${1}`
        }
    }
}

const cotizacionPost=async(req,res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const numero_cotizacion=numeros(consecutivo.numero_cotizacion)
        const {fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud}=req.body
        const coti=new Cotizacion({numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud})
        await coti.save()
        const nuevo=consecutivo.numero_cotizacion+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{numero_cotizacion:nuevo})
        const idUsuario=req.usuario._id
        const idPost=coti._id
        const navegador=req.headers['user-agent']
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,navegador,ip})
        await log.save()
        res.json({
            "msg":"Cotizacion creada exitosamente."
        })
    }
}

const crearConsecutivo =async(req, res) => {
    const{numero_cotizacion}=req.body;
    const consecutivoo = new Consecutivo({numero_cotizacion})
    await consecutivoo.save()
    const idUsuario=req.usuario._id
    const idPost=consecutivoo._id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPost,navegador,ip})
    await log.save()
    res.json({
        "msg":"Consecutivo Creado"
    })
}

const buscarPorId=async(req, res) => {
    const{id}=req.params;
    const coti = await Cotizacion.findById(id)
    const items=[]
    if(coti.items.item1.itemsEnsayo!=0){
        items.push("Item1")
    }
    if(coti.items.item2.itemsEnsayo!=0){
        items.push("Item2")
    }
    if(coti.items.item3.itemsEnsayo!=0){
        items.push("Item3")
    }
    res.json({
        items
    })
}
//Listar con populate los datos del idcliente dentro de este trae "ciudad"
//
const listarcotizacionesGet=async(req, res)=>{
    const coti=await Cotizacion.find({estado:1})
    .populate({
        path:'idCliente',
        populate:{
            path:"ciudad"
        }
    })
    .populate({
        path:"idCliente",
        populate:{
            path:"contacto",
            populate:{
                path:"ciudad"
            }
        }
    })
    .populate({
        path:'elabordo_por',
        populate:{
            path:"ciudad"
        }
    })
    res.json({coti})
}

const buscarPorCodigoGet=async(req, res)=>{
    const {numero_cotizacion}=req.query;
    const coti=await Cotizacion.find({numero_cotizacion})
    res.json({coti})
}

const buscarPorIdClienteGet=async(req, res)=>{
    const {id}=req.params;
    const coti=await Cotizacion.find().where('idCliente').in(id).exec();
    res.json({coti})
}

const buscarPorIdUsuarioGet=async(req, res)=>{
    const {id}=req.params;
    const coti=await Cotizacion.find().where('elabordo_por').in(id).exec();
    res.json({coti})
}

const buscarFechaGet=async(req, res)=>{
    const{fecha1,fecha2}=req.query;
    const coti=await Cotizacion.find({$and:[{fecha_emision: { $gte : fecha1 , $lte : fecha2}}]})
    res.json({coti})
}

const editarCotizacionPut=async(req, res)=>{
    const {id}=req.params;
    const a=await Cotizacion.findById(id)
    const numero_cotizacion=cambiar(a.numero_cotizacion)
    const {fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud}=req.body;
    const coti=new Cotizacion({numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud})
    await coti.save()
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    await log.save()
    res.json({
        "msg":"Cotizacion editada con exito"
    })
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Cotizacion.findByIdAndUpdate(id,{estado:1})

    const idUsuario=req.usuario._id
    const idPut= id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    await log.save()

    res.json({
        "msg":"La cotizacion esta activada"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0})
    const idUsuario=req.usuario._id
    const idPut= id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    await log.save()
    res.json({
        "msg":"La cotizacion esta desactivada"
    })
}
const actualizarInfo=async(req, res)=>{
    const {id}=req.params;
    const {descripcion,nit,direccion,telefono,correo}=req.body;
    const actualizar=await Consecutivo.findByIdAndUpdate(id,{descripcion,nit,direccion,telefono,correo})
    const idUsuario=req.usuario._id
    const idPut= id
    const navegador=req.headers['user-agent']
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,navegador,ip})
    await log.save()
    res.json({
        "msg":"Actualizacion con exito",
        actualizar
    })
}

const cambiar=(numero_cotizacion)=>{
    const division=Number(numero_cotizacion.split("")[numero_cotizacion.length-1])
    const sumar=division+1
    const cambio=numero_cotizacion.replace(/.$/,sumar)
    return cambio   
}

// API COTIZACIÓN: debe permitir: 
// GET Listar todas las cotizaciones ++++++++++++
// GET Buscar cotización por Num Cotización +++++++++
// GET Buscar cotización por id cliente +++++++++
// GET Buscar cotización por id usuario ++++++++++
// GET traer cotixacion entre fechas
// POST Insertar cotización ++++++++++++
// PUT Modificar datos de la cotización +
// PUT Activar cotización +
// PUT Inactivar cotización +


export {infoCali,actualizarInfo,buscarPorId,cotizacionPost,listarcotizacionesGet,buscarPorCodigoGet,buscarPorIdClienteGet,editarCotizacionPut,activarPut,desactivarPut,crearConsecutivo,buscarPorIdUsuarioGet,buscarFechaGet}