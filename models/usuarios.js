import mongoose from "mongoose";
const UsuarioSchema= new mongoose.Schema({
    tipoPersona:{type:String,required:true,default:"Natural"},
    //Natural  Juridica
    nombre:{type:String,maxlength:50,required:true},
    apellidos:{type:String,maxlength:50,required:true},
    // tipo de documento
    documento: { type: String, required: true ,minlength:5, unique:true},
    direccion:{type:String,maxlength:50,required:true},
    ciudad: { type: mongoose.Schema.ObjectId, ref: "Ciudad", required: true },

    departamento: { type: mongoose.Schema.ObjectId, ref: "Ciudad"},
    contacto: {type: mongoose.Schema.ObjectId, ref: "Usuario"},
    celular:{type:String,maxlength:50,required:true},
    telefono:{type:String},
    cargo:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},

    rol: { type: String,default:"CLIENTE"},
    //ADMIN,TECNICO,SUPERVISOR,CIENTIFICO,RECEPCIONISTA,CONTACTO
    foto:{type: String},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now()}
}) 


  
export default mongoose.model("Usuario",UsuarioSchema) 















































































