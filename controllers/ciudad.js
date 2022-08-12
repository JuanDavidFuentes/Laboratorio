import Ciudad from "../models/ciudad.js"

const ciudadPost=async(req,res)=>{
    const {ciudad,codciudad}=req.body
    const ciudadPost = new Ciudad ({coddepartamento,ciudad,codciudad})
    await ciudadPost.save()

    res.json({
        "msg":"Registro Exitoso"
    })
}

const ciudadPut=async(req,res)=>{
    const {id}=req.params
    const {ciudad,codciudad}=req.body
    const ciudadPut=await Ciudad.findByIdAndUpdate(id,{coddepartamento,ciudad,codciudad})
    res.json({
        "msg":`Actualizacion Exitosa!${ciudadPut}`
    })
}

const ciudadGetListarTodos=async(req,res)=>{
    const ciudad= await Ciudad.find()
    res.json({
        ciudad
    })
}

const ciudadesdepartamentoGet=async(req,res)=>{
    const {id}=req.params
    const ciudades= await Ciudad.find({coddepartamento:id})
    .populate("codciudad")//coddepartamento
    res.json({
        "msg":`${ciudades}`
    })
}
export {ciudadesdepartamentoGet,ciudadGetListarTodos,ciudadPut,ciudadPost}