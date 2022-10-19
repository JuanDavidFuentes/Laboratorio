import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.ObjectId, ref: "Usuario" },
    idPut: { type: String },
    idPost: { type: String },
    navegador: { type: String },
    ip: { type: String },
    fecha: { type: Date, default: Date.now }
})

export default mongoose.model("log", logSchema)