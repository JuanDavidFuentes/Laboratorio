import mongoose from "mongoose";

const Ordenschema = new mongoose.Schema({
    idMuestra: {type: mongoose.Schema.ObjectId,ref: "datos-muestra",required: true},
    ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo",required: true},
    realizado: {type: mongoose.Schema.ObjectId,ref: "Usuario",required: true},
    supervisado: {type: mongoose.Schema.ObjectId,ref: "Usuario",required: true},    
    observaciones: {type: String,default: ""},
    estado: {type: Number,default: 1},
    createdAt: {type: Date,default: Date.now}
})

export default mongoose.model('Orden', Ordenschema)