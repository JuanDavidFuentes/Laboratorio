import mongoose from "mongoose";

const Resultados = new mongoose.Schema({
    informeDeResultados:{type:String,maxlength:9, required: true},
    fechaYHoraRecepcion:{type:mongoose.Schema.ObjectId,ref:"Muestra",required:true},
    datosDelCliente:{type:mongoose.Schema.ObjectId,ref:"Cotizacion",required:true},
    datosMuestra:{type:mongoose.Schema.ObjectId,ref:"Muestra",required:true},	
    analisisMuestra:[
    {
        fechaAnalisis:{ type: Date, required: true },
        ensayo:{type: String, maxlength: 20, required: true },
        metodo:{type: String, maxlength: 80, required: true },
        tecnica:{type: String, maxlength: 50, required: true },	
        resultado:{type: String, maxlength: 50, required: true },
        incertidumbreExpandida:{type: String, maxlength: 50, required: true },
        valorMaximoNTC_131_2009: {type: String, maxlength: 5, required: true },	
        valorMinimoNTC_1311_2009: {type: String, maxlength: 5, required: true },
        unidades:{type: String, maxlength: 80, required: true }
    }														
    ],
    observaciones:{type: String, required: true},
    reviso:{type:mongoose.Schema.ObjectId,ref:"Empleado",required:true},	
    aprobo:{type:mongoose.Schema.ObjectId,ref:"Empleado",required:true}
})                                                                                         

export default mongoose.model("Resultado", Resultados);