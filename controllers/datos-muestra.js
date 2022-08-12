import DatosMuestra from "../models/datos-muestras.js"
import Consecutivo from "../models/consecutivo.js";


const DatosMuestraEnsayo=async(req, res)=>{
    const muestras=await DatosMuestra.find()
    .populate("cotizacion", "items")
    res.json({muestras})
}

const DatosMuestraEnsayoMun=async(req, res)=>{
    const{munRecoleccion}=req.query;
    const datos=await DatosMuestra.find({munRecoleccion})
    res.json({datos})
}

const DatosMuestraEnsayoFecha=async(req, res)=>{
    const{fecha1,fecha2}=req.query;
    const datos=await DatosMuestra.find({$and:[{createdAt: { $gte : fecha1 , $lte : fecha2}}]})   //pendiente 
    res.json({datos})
}

const numeros=(codMuestra)=>{
    if(codMuestra){
        let date = new Date();
        let output = String(date.getFullYear());
        if(codMuestra.toString().length===1){
           return `000${codMuestra}-${output}`
        }else if (codMuestra.toString().length===2){
            return `00${codMuestra}-${output}`
        }else if (codMuestra.toString().length===3){
            return `0${codMuestra}-${output}`
        }else if (codMuestra.toString().length===4){
            return `${codMuestra}-${output}`
        }
    }
}

const datosMuestraPost1=async(req,res)=>{
    const consecutivo=await Consecutivo.findOne()
    if(consecutivo){
        const codMuestra=numeros(consecutivo.codMuestra)
        const {solicitante,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado}=req.body
        const coti=new DatosMuestra({solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado})
        await coti.save()
        const nuevo=consecutivo.codMuestra+1
        await Consecutivo.findByIdAndUpdate(consecutivo._id,{codMuestra:nuevo})
        res.json({
            "msg":"Datos Muestra creada exitosamente."
        })
    }
}

const buscarFechaGet=async(req, res)=>{
    const{fecha1,fecha2}=req.query;
    const datos=await DatosMuestra.find({$and:[{createdAt: { $gte : fecha1 , $lte : fecha2}}]})
    res.json({datos})
}

const muestraCodigoGet=async(req, res)=>{
    const {codMuestra}=req.query;
    const codigoo=await DatosMuestra.find({codMuestra})
    res.json({codigoo})
}


const listarMuestrasxIdGet=async(req, res)=>{
    const muestras=await DatosMuestra.find()
    res.json({muestras}) 
}

const listarMuestrasGet=async(req, res)=>{
    const muestras=await DatosMuestra.find()
    .populate("codMuestra","solicitante")
    res.json({muestras}) //lte < o = gte > o =
}

const editarMuestraPut=async(req, res)=>{
    const {solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado}=req.body;
    const {id}=req.params;
    const editar = await DatosMuestra.findByIdAndUpdate(id,{solicitante,codMuestra,munRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item,estado})
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

export{datosMuestraPost1,muestraCodigoGet,listarMuestrasGet, listarMuestrasxIdGet, editarMuestraPut, activarPut, desactivarPut,buscarFechaGet, DatosMuestraEnsayo, DatosMuestraEnsayoMun}