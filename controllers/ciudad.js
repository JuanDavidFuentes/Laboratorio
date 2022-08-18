import Ciudad from "../models/ciudad.js"

const ciudadPost=async(req,res)=>{
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPost = new Ciudad ({coddepartamento,departamento,ciudad,codciudad})
    await ciudadPost.save()

    res.json({
        "msg":"Registro Exitoso"
    })
}

const ciudadPut=async(req,res)=>{
    const {id}=req.params
    const {coddepartamento,departamento,ciudad,codciudad}=req.body
    const ciudadPut=await Ciudad.findByIdAndUpdate(id,{coddepartamento,departamento,ciudad,codciudad})
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
    const {coddepartamento}=req.query;
    const depa= await Ciudad.find({coddepartamento})
    res.json({depa})
}

const buscarCiudadCodigoGet=async(req,res)=>{
    const {codciudad}=req.query;
    const city= await Ciudad.find({codciudad})
    res.json({city})
}

export {ciudadesdepartamentoGet,ciudadGetListarTodos,ciudadPut,ciudadPost,buscarCiudadCodigoGet}