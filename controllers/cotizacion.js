import Cotizacion from "../models/cotizacion.js";
import Consecutivo from "../models/consecutivo.js";
///ej: 0001-2022V1 
const numeros=(numero_cotizacion)=>{
    if(numero_cotizacion){
        let date = new Date();
        let output = String(date.getFullYear());
        if(numero_cotizacion.toString().length===1){
           return `000${numero_cotizacion}-${output}V1`
        }else if (numero_cotizacion.toString().length===2){
            return `00${numero_cotizacion}-${output}V1`
        }else if (numero_cotizacion.toString().length===3){
            return `0${numero_cotizacion}-${output}V1`
        }else if (numero_cotizacion.toString().length===4){
            return `${numero_cotizacion}-${output}V1`
        }
    }
}

const cotizacionPost=async(req,res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const numero_cotizacion=numeros(consecutivo.numero_cotizacion)
        const {fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud,estado}=req.body
        const coti=new Cotizacion({numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud,estado})
        await coti.save()
        const nuevo=consecutivo.numero_cotizacion+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{numero_cotizacion:nuevo})
        res.json({
            "msg":"Cotizacion creada exitosamente."
        })
    }
}
const crearConsecutivo =async(req, res) => {
    const{numero_cotizacion}=req.body;
    const consecutivoo = new Consecutivo({numero_cotizacion})
    await consecutivoo.save()
    res.json({
        "msg":"Consecutivo Creado"
    })

}

const listarcotizacionesGet=async(req, res)=>{
    const coti=await Cotizacion.find()
    res.json({coti})
}

const buscarPorCodigoGet=async(req, res)=>{
    const {numero_cotizacion}=req.query;
    const coti=await Cotizacion.find({numero_cotizacion})
    res.json({coti})
}

const buscarPorNombreGet=async(req, res)=>{
    const {id}=req.params;
    const coti=await Cotizacion.find().where('datos_cliente').in(id).exec();
    res.json({coti})
}

const editarCotizacionPut=async(req, res)=>{
    const {numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud,estado}=req.body;
    const {id}=req.params;
    const editar = await Cotizacion.findByIdAndUpdate(id,{numero_cotizacion,fecha_emision,idCliente,idContacto,validez_oferta,entrega_resultados,elabordo_por,items,observaciones,subtotal,descuento,iva,total,medio_solicitud,estado})
    res.json({
        "msg":"Cotizacion editada con exito"
    })
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await Cotizacion.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"La cotizacion esta activada"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const desactivar=await Cotizacion.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"La cotizacion esta desactivada"
    })
}


// API COTIZACIÓN: debe permitir: 
// GET Listar todas las cotizaciones +
// GET Buscar cotización por Num Cotización +
// GET Buscar cotización por nombre del cliente +
// POST Insertar cotización +
// PUT Modificar datos de la cotización +
// PUT Activar cotización +
// PUT Inactivar cotización +


export {cotizacionPost,listarcotizacionesGet,buscarPorCodigoGet,buscarPorNombreGet,editarCotizacionPut,activarPut,desactivarPut,crearConsecutivo}