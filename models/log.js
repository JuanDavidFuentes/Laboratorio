import mongoose from 'mongoose';

const logSchema= new mongoose.Schema({
    idUsuario:{type: String},
    idPostPut:{type: String},
    navegador:{type: String},
    ip:{type: String},
})

export default mongoose.model("log",logSchema)