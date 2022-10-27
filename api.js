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


app.get('/obtener-usuarios',(req,res) => {
    db.select('*').from('Usuarios').then(users => {
        res.json(users)
    })
})

app.get('/obtener-librerias',(req,res) => {
    db.select('*').from('Librerias').then(librerias => {
        res.json(librerias)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.get('/obtener-libros',(req,res) => {
    db.select('*').from('Libros').then(libros => {
        res.json(libros)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.get('/obtener-salidas',(req,res) => {
    db.select('*').from('Salidas').then(salidas => {
        res.json(salidas)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.get('/obtener-tipos-de-libro',(req,res) => {
    db.select('*').from('TipoLibro').then(tipoLibro => {
        res.json(tipoLibro)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/registrar-usuario',(req,res) => {
    let {nombre,apellidos,fechaNacimiento,sexo} = req.body

    db('Usuarios').insert({
        Nombre: nombre,
        Apellidos: apellidos,
        FechaNacimiento: fechaNacimiento,
        Sexo: sexo
    })
    .then(resp => {
        res.json('Usuario registrado con éxito')
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/registrar-libreria',(req,res) => {

    let {codigo,descripcion} = req.body

    db('Librerias').insert({
        Codigo: codigo,
        Descripcion: descripcion
    })
    .then(resp => {
        res.json('Libreria registrada con éxito')
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/registrar-libro',(req,res) => {

    let {titulo,autor,fechaPublicacion,editorial,etiquetas,tipoLibro} = req.body

    db('Libros').insert({
        Titulo: titulo,
        Autor: autor,
        Fecha_Publicacion: fechaPublicacion,
        Editorial: editorial,
        Etiquetas: etiquetas,
        Fk_TipoLibro: tipoLibro
    })
    .then(resp => {
        res.json('Libro registrado con éxito')
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/registrar-salida', (req,res) => {

    let {fecha,usuario,libro,libreria} = req.body

    db('Salidas').insert({
        Fecha: fecha,
        Fk_Usuario: usuario,
        Fk_Libro: libro,
        Fk_Libreria: libreria
    })
    .then(resp => {
        res.json('Salida registrada con éxito')
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.post('/registrar-tipo-de-libro', (req,res) => {
    let {codigo, descripcion, formato, grupo} = req.body

    db('TipoLibro').insert({
        Codigo: codigo,
        Descripcion: descripcion,
        Formato: formato,
        Grupo: grupo
    })
    .then(resp => {
        res.json('Tipo de libro registrado con éxito')
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

app.listen(port,() => {
    console.log(`Escuchando el puerto ${port}`)
})