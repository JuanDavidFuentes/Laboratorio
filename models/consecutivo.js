import mongoose from "mongoose";

const ConsecutivoSchema= new mongoose.Schema({
    numero_cotizacion:{type:Number,default:0},
    informe_No:{type:Number,default:0},
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)