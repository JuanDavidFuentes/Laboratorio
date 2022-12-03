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

const Bitacora=async(req,res)=>{
    const bitacora= await Log.find()
    .populate({
        path:"idUsuario",
    })
    res.json({
        bitacora
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
        const texto=`El usuario: ${req.usuario.nombre} ha agregado una cotización`
        const ip=req.socket.remoteAddress
        const log=new Log({idUsuario,idPost,texto,ip})
        await log.save()
        res.json({
            "msg":"Cotización creada exitosamente."
        })
    }
}

const crearConsecutivo =async(req, res) => {
    const{numero_cotizacion}=req.body;
    const consecutivoo = new Consecutivo({numero_cotizacion})
    await consecutivoo.save()
    const idUsuario=req.usuario._id
    const idPost=consecutivoo._id
    const texto=`El usuario: ${req.usuario.nombre} ha creo el consecutivo`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPost,texto,ip})
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
        items.push("item1")
    }
    if(coti.items.item2.itemsEnsayo!=0){
        items.push("item2")
    }
    if(coti.items.item3.itemsEnsayo!=0){
        items.push("item3")
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
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({coti})
}

const listarTodasCotizacionesGet=async(req, res)=>{
    const coti=await Cotizacion.find({estado:0})
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
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({coti})
}

const listarTodasCotizacionesEnProceso=async(req, res)=>{
    const coti=await Cotizacion.find({estado:2})
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
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
    res.json({coti})
}


const buscarPorCodigoGet=async(req, res)=>{
    const {numero_cotizacion}=req.query;
    const coti=await Cotizacion.find({numero_cotizacion})
    res.json({coti})
}

const buscarPorIdClienteGet=async(req, res)=>{
    const {id}=req.params;
    const coti=await Cotizacion.find({$and:[{idCliente:{$eq:id}},{estado:{$eq:1}}]}) //{idCliente:id}
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
    .populate("items.item1.itemsEnsayo.ensayo")
    .populate("items.item2.itemsEnsayo.ensayo")
    .populate("items.item3.itemsEnsayo.ensayo")
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
    const texto=`El usuario: ${req.usuario.nombre} ha editado una cotización`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"Cotización editada con exito"
    })
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Cotizacion.findByIdAndUpdate(id,{estado:2,motivo:""}) // falta un put para que este en estado 1
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha activado una cotización`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()

    res.json({
        "msg":"La cotización esta en estado 'En proceso"
    })
}

const activarPutR=async(req, res)=>{
    const {id}=req.params;
    const activar=await Cotizacion.findByIdAndUpdate(id,{estado:1,motivo:""}) // falta un put para que este en estado 1
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha activado una cotización`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()

    res.json({
        "msg":"La cotización esta en estado confirmado"
    })
}
 
const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const {motivo}=req.body;
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0,motivo:motivo})
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha desactivado una cotización`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"La cotización esta en estado rechazado"
    })
}
const actualizarInfo=async(req, res)=>{
    const {id}=req.params;
    const {numero_cotizacion,informe_No,codMuestra,iva,descripcion,nit,direccion,telefono,correo}=req.body;
    const actualizar=await Consecutivo.findByIdAndUpdate(id,{numero_cotizacion,informe_No,codMuestra,iva,descripcion,nit,direccion,telefono,correo})
    const idUsuario=req.usuario._id
    const idPut= id
    const texto=`El usuario: ${req.usuario.nombre} ha editado la información`
    const ip=req.socket.remoteAddress
    const log=new Log({idUsuario,idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"Actualización con exito",
        actualizar
    })
}

const reiniciar=async(req, res)=>{
    const {id}=req.params;
    const {numero_cotizacion,informe_No,codMuestra}=req.body;
    const actualizar=await Consecutivo.findByIdAndUpdate(id,{numero_cotizacion,informe_No,codMuestra})
    const idPut= id
    const texto=`Se han reiniciado los concecutivos`
    const ip=req.socket.remoteAddress
    const log=new Log({idPut,texto,ip})
    await log.save()
    res.json({
        "msg":"Actualización con exito",
        actualizar
    })
}

const cambiar=(numero_cotizacion)=>{
    const division=Number(numero_cotizacion.split("")[numero_cotizacion.length-1])
    const sumar=division+1
    const cambio=numero_cotizacion.replace(/.$/,sumar)
    return cambio   
}

const ListarConsecutivo=async(req, res)=>{
    const consecutivo=await Consecutivo.find()
    res.json({consecutivo})
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


export {reiniciar,activarPutR,listarTodasCotizacionesEnProceso,listarTodasCotizacionesGet,Bitacora,ListarConsecutivo,infoCali,actualizarInfo,buscarPorId,cotizacionPost,listarcotizacionesGet,buscarPorCodigoGet,buscarPorIdClienteGet,editarCotizacionPut,activarPut,desactivarPut,crearConsecutivo,buscarPorIdUsuarioGet,buscarFechaGet}