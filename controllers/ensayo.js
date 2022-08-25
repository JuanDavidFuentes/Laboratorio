 import Ensayo from "../models/ensayo.js";

const ensayoPost=async(req,res)=>{
    const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion}=req.body
    const ensayoPost = new Ensayo ({ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion})
    await ensayoPost.save()
    res.json({
        ensayoPost
    })
}

const ensayoPut = async (req,res)=>{
    const {id}=req.params
    const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion}=req.body
    const ensayoput =await Ensayo.findByIdAndUpdate(id,{ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion})
    res.json({
        "msg":"Actualizacion Exitosa!"
    })
}
const ensayoPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Ensayo.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"Ensayo activado con exito"
    })
}

const ensayoPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Ensayo.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"Ensayo desactivado con exito"
    })
}

const ensayoGetTodos=async(req,res)=>{
    const ensayo= await Ensayo.find()
    res.json({
        ensayo
    }) 
}

const ensatoGetbyId=async(req,res)=>{
    const {id}=req.params
    const ensayo =await Ensayo.findOne({id})
    res.json({
        ensayo
    })
}

export {ensayoPost,ensayoPut,ensayoGetTodos,ensatoGetbyId,ensayoPutDesactivar,ensayoPutActivar}
