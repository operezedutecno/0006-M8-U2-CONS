const express = require('express');
const app = express();
const {computadoras, marcas, nuevoComputador}=require('./consultas')
const hbs = require("express-handlebars");
app.use(express.json())

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"))

app.set("view engine", "handlebars")

app.use("/js", express.static(`${__dirname}/assets/js`))

app.engine(    
    "handlebars",
    hbs.engine({
        layoutsDir: `${__dirname}/views`,
        partialsDir: `${__dirname}/views/partials`,
    })
);

app.get("/", async (req, res) => {
    const respuestaC= await computadoras()      
    res.render("Listado", { 
        layout: "Listado",
        titulo: 'Listado de Computadoras',
        computador: respuestaC.map((item) => {
            return { id: item.id,                     
                    nombre: item.nombre,
                    ram: item.ram,
                    almacenamiento: item.almacenamiento,                    
                };
          })    
    });
})

app.get("/registrar", async (req, res) => {
    const respuestaM= await marcas()  
    res.render("Registrar", {
        layout: 'Registrar',
        titulo: 'Registrar Computadora',
        computadorMarca: respuestaM.map((item) => {
            return { id: item.id,                     
                    nombre: item.nombre                                  
                };
          })  
    })
})

app.post('/procesar',async (request, response)=>{
    const {marca, memoriaRam, almacenamiento}=request.body    
    const parametros={
        marca, memoriaRam, almacenamiento
    }
 
    const respuesta= await nuevoComputador(parametros)    
    response.status(respuesta.mensaje? 500 : 201).json(respuesta.mensaje? respuesta.mensaje : respuesta )       
})

