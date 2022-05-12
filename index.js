const express = require('express');
const app = express();

const hbs = require("express-handlebars");

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

app.get("/", (req, res) => {
    res.render("Listado", { 
        layout: "Listado",
        titulo: 'Listado de Computadoras'
    });
})

app.get("/registrar", (req, res) => {
    res.render("Registrar", {
        layout: 'Registrar',
        titulo: 'Registrar Computadora'
    })
})


