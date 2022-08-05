import DatosMuestra from "../models/datos-muestras.js"

const datosMuestraPost=async(req,res)=>{
    const {id_cotizacion,codigo_muestra,municipio_recoleccion,direccion_toma,recoletada_por,procedimiento,tipo_muestra,matriz_muestra,municipio,fecha_recoleccion,observaciones,entregada_por,cedula,estado,firma,fecha_recepcion_muestra,recibida_por,foto}=req.body
    
    const datoss = new DatosMuestra({id_cotizacion,codigo_muestra,municipio_recoleccion,direccion_toma,recoletada_por,procedimiento,tipo_muestra,matriz_muestra,municipio,fecha_recoleccion,observaciones,entregada_por,cedula,estado,firma,fecha_recepcion_muestra,recibida_por,foto})

    await datoss.save()

    res.json({
        msg:"Datos de muestra creados exitosamente"
    })
}

const muestraCodigoGet=async(req, res)=>{
    const {codigo}=req.query;
    const codigoo=await DatosMuestra.find({codigo})
    res.json({codigoo})
}


const listarMuestrasxIdGet=async(req, res)=>{
    const muestras=await DatosMuestra.find()
    res.json({muestras}) 
}

const listarMuestrasGet=async(req, res)=>{
    const muestras=await DatosMuestra.find()
    .populate("id_cotizacion","numero_cotizacion")
    res.json({muestras})
}

const editarMuestraPut=async(req, res)=>{
    const {id_cotizacion,codigo_muestra,municipio_recoleccion,direccion_toma,recoletada_por,procedimiento,tipo_muestra,matriz_muestra,municipio,fecha_recoleccion,observaciones,entregada_por,cedula,estado,firma,fecha_recepcion_muestra,recibida_por,foto}=req.body;
    const {id}=req.params;
    const editar = await DatosMuestra.findByIdAndUpdate(id,{id_cotizacion,codigo_muestra,municipio_recoleccion,direccion_toma,recoletada_por,procedimiento,tipo_muestra,matriz_muestra,municipio,fecha_recoleccion,observaciones,entregada_por,cedula,estado,firma,fecha_recepcion_muestra,recibida_por,foto})
    res.json({
        "msg":"Datos de la muestra editada con exito"
    })
}

const activarPut=async(req, res)=>{
    const {id}=req.params;
    const activar=await DatosMuestra.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"La cotizacion esta activado"
    })
}

const desactivarPut=async(req, res)=>{
    const {id}=req.params;
    const desactivar=await DatosMuestra.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"La cotizacion esta desactivado"
    })
}



// GET Listar todas las muestras YA
// GET Listar muestra por codigo YA
// GET Buscar muestra por codigo YA 
// POST Insertar muestra YA
// PUT Modificar datos de la  muestra YA
// PUT Activar muestra YA 
// PUT Inactivar muestra YA

export{datosMuestraPost,muestraCodigoGet,listarMuestrasGet, listarMuestrasxIdGet, editarMuestraPut, activarPut, desactivarPut}