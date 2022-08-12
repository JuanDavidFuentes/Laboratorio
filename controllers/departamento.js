import Departamento from "../models/departamento.js"


const departamentoPost=async(req,res)=>{
    const {coddepartamento,departamento}=req.body
    const ciudadPost = new Departamento ({coddepartamento,departamento})
    await ciudadPost.save()
    res.json({
        "msg":"Registro Exitoso"
    })
}

const departamentoput=async(req,res)=>{
    const {id}=req.params
    const {coddepartamento,departamento}=req.body
    const departamentopost = Departamento.findOneAndUpdate (id,{coddepartamento,departamento})
    res.json({
        "msg":`${departamentopost}`
    })
}

const departamentoGetListarTodos=async(req,res)=>{
    const departamento= await Departamento.find()
    res.json({
        departamento
    })
}

const departamentosdelete=async(req,res)=>{
    const {id}=req.params
    const departamento = await Departamento.findByIdAndDelete({id})
    res.json({
        "msg":`${departamento}`
    })
}

export {departamentoPost,departamentoput,departamentoGetListarTodos,departamentosdelete}