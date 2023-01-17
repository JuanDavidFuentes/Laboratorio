import DatosMuestra from "../models/datos-muestras.js";
import Usuario from "../models/usuarios.js"
import Consecutivo from "../models/consecutivo.js";
import Cotizacion from "../models/cotizacion.js";
import Ensayo from "../models/ensayo.js";
import Log from "../models/log.js";
import Orden_del_servicio from "../models/orden_del_servicio.js"





const DatosMuestraEnsayo = async (req, res) => {
    const muestras = await DatosMuestra.find()
        .populate("cotizacion", "items")
    res.json({ muestras })
}

const DatosMuestraEnsayoMun = async (req, res) => {
    const { munRecoleccion } = req.query;
    const datos = await DatosMuestra.find({ munRecoleccion })
    res.json({ datos })
}

const DatosMuestraEnsayoFecha = async (req, res) => {
    const { fecha1, fecha2 } = req.query;
    const datos = await DatosMuestra.find({ $and: [{ createdAt: { $gte: fecha1, $lte: fecha2 } }] })   //pendiente 
    res.json({ datos })
}

const numeros = (codMuestra) => {
    if (codMuestra) {
        let date = new Date();
        let output = String(date.getFullYear());
        if (codMuestra.toString().length === 1) {
            return `000${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 2) {
            return `00${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 3) {
            return `0${codMuestra}-${output}`
        } else if (codMuestra.toString().length === 4) {
            return `${codMuestra}-${output}`
        }
    }
}

const datosMuestraPost1 = async (req, res) => {
    const consecutivo = await Consecutivo.findOne()
    if (consecutivo) {
        const codMuestra = numeros(consecutivo.codMuestra)
        const { solicitante, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado } = req.body
        const coti = new DatosMuestra({ solicitante, codMuestra, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item, estado })
        await coti.save()
        const nuevo = consecutivo.codMuestra + 1
        await Consecutivo.findByIdAndUpdate(consecutivo._id, { codMuestra: nuevo })
        const idUsuario = req.usuario._id
        const idPost = coti._id
        const texto=`El usuario: ${req.usuario.nombre} ha creado una muestra`
        const ip = req.socket.remoteAddress
        const log = new Log({ idUsuario, idPost ,texto, ip })
        await log.save()
        const idMuestra = coti._id
        const cotiza = await Cotizacion.findById(coti.cotizacion)
        if (item === "item1") {
            const guardarEnsayo=[]
            for (let i = 0; i < cotiza.items.item1.itemsEnsayo.length; i++) {
                const idensayo = cotiza.items.item1.itemsEnsayo[i].ensayo
                const ensayo = await Ensayo.findById(idensayo)
                const titular = ensayo.responsables.titular
                const a = await Usuario.findById(titular)
                if (a.estado !== 1) {
                    const suplente = ensayo.responsables.suplente
                    const b = await Usuario.findById(suplente)
                    if (b.estado !== 1) {
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        guardarEnsayo.push({ idensayo, supervisado })
                    } else {
                        const realizado = b._id
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        guardarEnsayo.push({ idensayo, realizado, supervisado })
                    }
                } else {
                    const realizado = a._id
                    const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                    const supervisado = c._id
                    guardarEnsayo.push({ idensayo, realizado, supervisado })
                }
            }
            const oferta = new Orden_del_servicio({ idMuestra, guardarEnsayo })
            await oferta.save()
        }
        if (item === "item2") {
            for (let i = 0; i < cotiza.items.item2.itemsEnsayo.length; i++) {
                const idensayo = cotiza.items.item2.itemsEnsayo[i].ensayo
                const ensayo = await Ensayo.findById(idensayo)
                const titular = ensayo.responsables.titular
                const a = await Usuario.findById(titular)
                if (a.estado !== 1) {
                    const suplente = ensayo.responsables.suplente
                    const b = await Usuario.findById(suplente)
                    if (b.estado !== 1) {
                        const ensayo = []
                        const idMuestra = coti._id
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        ensayo.push({ idensayo, supervisado })
                        const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                        await oferta.save()
                    } else {
                        const ensayo = []
                        const idMuestra = coti._id
                        const realizado = b._id
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        ensayo.push({ idensayo, realizado, supervisado })
                        const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                        await oferta.save()
                    }
                } else {
                    const ensayo = []
                    const idMuestra = coti._id
                    const realizado = a._id
                    const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                    const supervisado = c._id
                    ensayo.push({ idensayo, realizado, supervisado })
                    const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                    await oferta.save()
                }
            }
        }     
        if (item === "item3") {
            for (let i = 0; i < cotiza.items.item3.itemsEnsayo.length; i++) {
                const idensayo = cotiza.items.item3.itemsEnsayo[i].ensayo
                const ensayo = await Ensayo.findById(idensayo)
                const titular = ensayo.responsables.titular
                const a = await Usuario.findById(titular)
                if (a.estado !== 1) {
                    const suplente = ensayo.responsables.suplente
                    const b = await Usuario.findById(suplente)
                    if (b.estado !== 1) {
                        const ensayo = []
                        const idMuestra = coti._id
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        ensayo.push({ idensayo, supervisado })
                        const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                        await oferta.save()
                    } else {
                        const ensayo = []
                        const idMuestra = coti._id
                        const realizado = b._id
                        const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                        const supervisado = c._id
                        ensayo.push({ idensayo, realizado, supervisado })
                        const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                        await oferta.save()
                    }
                } else {
                    const ensayo = []
                    const idMuestra = coti._id
                    const realizado = a._id
                    const c = await Usuario.findOne({ rol: "SUPERVISOR" })
                    const supervisado = c._id
                    ensayo.push({ idensayo, realizado, supervisado })
                    const oferta = new Orden_del_servicio({ idMuestra, ensayo })
                    await oferta.save()
                }
            }
        }

        res.json({
            "msg": "Datos Muestra creada exitosamente.",
            coti
        })
    }
}

const buscarFechaGet = async (req, res) => {
    const { fecha1, fecha2 } = req.query;
    const datos = await DatosMuestra.find({ $and: [{ createdAt: { $gte: fecha1, $lte: fecha2 } }] })
    res.json({ datos })
}

const muestraCodigoGet = async (req, res) => {
    const { codMuestra } = req.query;
    const codigoo = await DatosMuestra.find({ codMuestra })    
    res.json({ codigoo })
}


const listarMuestrasxIdGet = async (req, res) => {
    const{id}=req.params;
    const muestras = await DatosMuestra.findOne({id})
    res.json({ muestras })// fata los populate
}

const listarMuestrasGet = async (req, res) => {
    const muestras = await DatosMuestra.find()
        .populate({
            path:"solicitante",
            populate:{
                path:"contacto",
                    populate:{
                        path:"ciudad"
                    }
            }
        })
        .populate({
            path:"munRecoleccion"
            })
        .populate({
            path:"tipoMuestra"
        })
        .populate({
            path:"cotizacion",
            populate:{
                path:"idCliente",
                populate:{
                    path:"ciudad"
                }
            }
        })
        .populate({
            path:"cotizacion",
            populate:{
                path:"idCliente",
                populate:{
                    path:"contacto",
                    populate:{
                        path:"ciudad"
                    }
                }
            }
        })
    res.json({ muestras }) //lte < o = gte > o =
}

const editarMuestraPut = async (req, res) => {
    const { id } = req.params;
    const desactivar = await Orden_del_servicio.findByIdAndUpdate(id, { estado: 0 })    
    const desactivarM =  await DatosMuestra.findByIdAndUpdate(desactivar.idMuestra, {estado:0})
    const idUsuario = req.usuario._id
    const idPut = id
    const texto=`El usuario: ${req.usuario.nombre} ha desactivado una muestra`
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPut,texto, ip })
    await log.save()
    res.json({
        "msg": "Vuelve a activar la muestra",
    })
}

const activarPut = async (req, res) => {
    const { id } = req.params;
    const desactivar = await Orden_del_servicio.findByIdAndUpdate(id, { estado: 1 })    
    const desactivarM =  await DatosMuestra.findByIdAndUpdate(desactivar.idMuestra, {estado:1})
    const idUsuario = req.usuario._id
    const idPut = id
    const texto=`El usuario: ${req.usuario.nombre} ha activado una muestra`
    const ip = req.socket.remoteAddress
    const log = new Log({ idUsuario, idPut,texto, ip })
    await log.save()
    res.json({
        "msg": "Muestra activada",
    })
}


// GET Listar todas las muestras YA
// GET Listar muestra por codigo YA
// GET Buscar muestra por codigo YA 
// POST Insertar muestra YA
// PUT Modificar datos de la  muestra YA
// PUT Activar muestra YA 
// PUT Inactivar muestra YA

export { datosMuestraPost1, muestraCodigoGet, listarMuestrasGet, listarMuestrasxIdGet, editarMuestraPut, activarPut, buscarFechaGet, DatosMuestraEnsayo, DatosMuestraEnsayoMun }