const {Pool} = require('pg');

const pool = new Pool({
    user:"postgres",
    password:"leoney31",
    database:"consolidacion_handelbars",
    host:"localhost",
    port: 5432
    
});

const computadoras= async()=>{
    const sql= `SELECT * 
                FROM computadoras c
                inner join marcas m on m.id = c.marca_id `
    try {
        const { rows }= await pool.query(sql)
        return rows
    } catch (error) {
        return {mensaje: error.message}
    }
}

const marcas= async()=>{
    const sql= `SELECT * FROM marcas`
    try {
        const { rows }= await pool.query(sql)
        return rows
    } catch (error) {
        return {mensaje: error.message}
    }
}

const nuevoComputador= async(datos)=>{
    const {marca, memoriaRam, almacenamiento}= datos
    const parametros={
        text:'INSERT INTO computadoras(marca_id, ram, almacenamiento) VALUES($1, $2, $3) RETURNING*',     
        values: [marca, memoriaRam, almacenamiento]       
    }

    try {
        const { rows }=await pool.query(parametros)
        return rows
    } catch (error) {
        return { status: 'ERROR', mensaje: error.message }
    }
}

module.exports= {computadoras, marcas, nuevoComputador}