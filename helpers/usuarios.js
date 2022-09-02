import Usuario from "../models/usuarios.js";

const HerlpersUsuario = {
  existeEmail: async (email) => {
    if (email) {
      const existe = await Usuario.findOne({ email });
      if (existe) throw new Error("Email ya existe en la bd");
    }
  },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      throw new Error(`El id  ${id} no existe`)
    }
  },

  existeUsuarioById2: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      return false
    }
    return true
  },

  existeUsuarioNombre: async (nombre) => {
    const Existe= await Usuario.findOne({nombre})
    if (!Existe) {
      throw new Error(`El nombre: ${nombre} no existe`)
    }
  },

  contacto: async (contacto) => {
    contacto.forEach(contactos => {
      if (!contactos.nombre){
        throw new Error(`El nombre del contacto es obligatorio`)
      }
      if (!contactos.telefono){
        throw new Error(`El numero del contacto es obligatorio`)
      }
      if (!contactos.correoElectronico){
        throw new Error(`El correo electronico del contacto es obligatorio`)
      }
    })
  },

  noexisteEmail:async(email)=>{
    if(email){
        const existe=await Usuario.findOne({email})
        if(!existe) throw new Error("Correo no existe Base de datos")
    }
  },

  existeDocumento: async (documento) => {
    if (documento) {
      const existe = await Usuario.findOne({ documento });
      if (existe) throw new Error("documento ya existe en la bd");
    }
  },
}

export default HerlpersUsuario;              
