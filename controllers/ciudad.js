import Ciudad from "../models/ciudad.js"

const ciudadPost=async(req,res)=>{
    const {departamento,coddepartamento,ciudad,codciudad}=req.body
    const ciudadPost = new Ciudad ({departamento,coddepartamento,ciudad,codciudad})
    await ciudadPost.save()

    res.json({
        msg:"Registro Exitoso"
    })
}

const ciudadPut=async(req,res)=>{
    const {id}=req.params
    const {departamento,coddepartamento,ciudad,codciudad}=req.body
    const ciudadPut=await Ciudad.findByIdAndUpdate(id,{departamento,coddepartamento,ciudad,codciudad})
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

const departamentoGet=async(req,res)=>{
    const {departamento}=req.query
    const departamento1=await Ciudad.findOne({departamento})
    
    res.json({
        "msg":`${departamento1}`
    })
}

const ciudadesdepartamentoGet=async(req,res)=>{
    const {coddepartamento}=req.query
    
    const ciudades=await Ciudad.find({ciudad})
}
export {ciudadPost,ciudadPut}