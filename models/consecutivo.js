import mongoose from "mongoose";

const ConsecutivoSchema= new mongoose.Schema({
    numero_cotizacion:{type:Number,default:1},
    informe_No:{type:Number,default:1},
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)