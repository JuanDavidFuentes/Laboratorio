import mongoose from "mongoose";
const UsuarioSchema= new mongoose.Schema({
    nombre:{type:String,maxlength:50,required:true},
    apellidos:{type:String,maxlength:50,required:true},
    direccion:{type:String,maxlength:50,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    telefono:{type:String,maxlength:50,required:true},
    cedula:{type:String,maxlength:50,required:true},
    departamento:{type:String,maxlength:50,required:true},
    municipio:{type:String,maxlength:50,required:true},
    rol:{type:mongoose.Schema.ObjectId,ref:"Rol",required:true},
    cargo:{type:String,maxlength:50,required:true},
    foto:{type:String},
    empresa:{type:String,maxlength:50,required:true},
    estado:{type:Number,default:1},
    contacto:[
        {nombre:{type:String,required:true},
        telefono:{type:String,required:true},
        correoElectronico:{type:String,maxlength:100,required:true}
    }],
    createdAt:{type:Date,default:Date.now()}
})
  
export default mongoose.model("Usuario",UsuarioSchema) 