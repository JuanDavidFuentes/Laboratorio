import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import fileupload from "express-fileupload";
import usuario from "../routes/usuarios.js";
import cotizacion from "../routes/cotizacion.js";
import dmuestra from "../routes/datos-muestra.js";
import informeR from "../routes/informe-resultados.js";
// import ordenServidor from "../routes/orden_del_servicio.js"

class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT;
        this.connectarbd()
        this.routes() 
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(express.static())
        this.app.use(fileupload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }

    async connectarbd(){
        await dbConnection()
    }

    routes(){
        this.app.use("/api/usuarios",usuario)
        this.app.use("/api/cotizacion",cotizacion)
        this.app.use("/api/DMuestra",dmuestra)
        this.app.use("/api/informeR",informeR)
        // this.app.use("/api/Orden_servicio",ordenServidor)

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server