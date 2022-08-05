import mongoose from "mongoose";

const CotizacionSchema= new mongoose.Schema({
    numero_cotizacion:{type:Number},
    fecha_emision:{type:Date,default:Date.now()},
    datos_cliente:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    validez_oferta:{type:String,required:true},
    elabordo_por:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    items:[
        {
            codigo_ref:{type:String,required:true},
            descripcion_ensayo:{type:String,required:true},
            unidades:{type:String,required:true},
            tecnica_analitica:{type:String,required:true},
            metodo_analitico:{type:String,required:true},
            limite_cuantificacion:{type:String,required:true},
            costo_ensayo:{type:Number,required:true},
            costo_item:{type:Number,required:true},
        }
    ],
    observaciones_propuesta_tecnica_economica:{type:String,required:true},
    subtotal:{type:Number,required:true},
    iva:{type:Number,required:true},
    total:{type:Number,required:true},
    medio_solicitud:{type:String,maxlength:100,required:true},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Cotizacion",CotizacionSchema)