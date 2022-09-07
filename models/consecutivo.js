import mongoose from "mongoose";

const ConsecutivoSchema= new mongoose.Schema({
    numero_cotizacion:{type:Number,default:1},
    informe_No:{type:Number,default:1},
    codMuestra:{type:Number,default:1},
    iva:{type:Number}
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)