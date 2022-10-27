pass = 't8!TR3#r'




















const express = require('express')
const db = require('knex')({
    client: 'mssql',
    connection: {
        host: 'sql-ucaribe.c5suiyvjokfg.us-east-2.rds.amazonaws.com',
        port: 1433,
        user: 'admin',
        password: pass,
        database: 'ucaribe'
    }
})
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = 3000


app.post('/obtener-usuario',(req,res) => {
    let {id,nombre,apellidos,fechaNacimiento,sexo} = req.body

    db.raw("Exec SP_GetUsuario " + id + "," + nombre + "," + apellidos + "," + fechaNacimiento + "," + sexo).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/obtener-librerias',(req,res) => {
    let {id,codigo,descripcion} = req.body
    db.raw("EXEC SP_GetLibrerias " + id + "," + codigo + "," + descripcion).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/obtener-libros',(req,res) => {
    let {id,titulo,autor,fechaPublicacion,editorial,etiquetas,tipoLibro} = req.body
    db.raw("EXEC SP_GetLibros " + id + "," + titulo + "," + autor + "," + fechaPublicacion + "," + editorial + "," + etiquetas + "," + tipoLibro).then(sp => {
        res.json(sp)
    })
    .catch(err => {
        res.json(err)
    })
})

app.post('/obtener-salidas',(req,res) => {
    let {idSalida,fecha,idUsuario,idLibro,idLibreria} = req.body

    db.raw("Exec SP_GetSalidas " + idSalida + "," + fecha + "," + idUsuario + "," + idLibro + "," + idLibreria).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.json(err)
    })
})

app.post('/obtener-tipos-de-libro',(req,res) => {
    let {id,codigo,descripcion,formato,grupo} = req.body

    db.raw("Exec SP_GetTipoLibro " + id + "," + codigo + "," + descripcion + "," + formato + "," + grupo).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.json(err)
    })
})

app.post('/set-usuario',(req,res) => {
    let {id,nombre,apellidos,fechaNacimiento,sexo} = req.body

    db.raw('EXEC SP_SetUsuario ' + id + "," + nombre + "," + apellidos + "," + fechaNacimiento + "," + sexo).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/set-libreria',(req,res) => {
    let {id,codigo,descripcion} = req.body

    db.raw('EXEC SP_SetLibreria ' + id + "," + codigo + "," + descripcion).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/set-libro',(req,res) => {
    let {idLibro,titulo,autor,fechaPublicacion,editorial,etiquetas,idTipoLibro} = req.body

    db.raw('EXEC SP_SetLibro ' + idLibro + "," + titulo + "," + autor + "," + fechaPublicacion + "," + editorial + "," + etiquetas + "," + idTipoLibro).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/set-salidas',(req,res) => {
    let {idSalida,fecha,idUsuario,idLibro,idLibreria} = req.body

    db.raw('EXEC SP_SetSalidas ' + idSalida + "," + fecha + "," + idUsuario + "," + idLibro + "," + idLibreria).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/set-tipo-libro',(req,res) => {
    let {id,codigo,descripcion,formato,grupo} = req.body

    db.raw('EXEC SP_TipoLibro ' + id + "," + codigo + "," + descripcion + "," + formato + "," + grupo).then(spRes => {
        res.json(spRes)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.listen(port,() => {
    console.log(`Escuchando el puerto ${port}`)
})