const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const path=require('path')
//conection con la base de datos
mongoose
    .connect('mongodb://127.0.0.1:27017/empleadosds02')
    .then((x)=>{
    console.log(`Conectado exitosamente a mongo a la base de datos:"${x.connections[0].name}"`)
    })
    .catch((err)=>{
        console.error('Error al conectarse con Mongo',err.reason)
    })
//configuracion del servidor web
const empleadoRuta=require('../backEnd/routes/empleados.route')
const app=express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:false,
    })
)

app.use(cors())
app.use(express.static(path.join(__dirname,'dist/mean-empleados')))
app.use('/',express.static(path.join(__dirname,'dist/mean-empleados')))
app.use('/api',empleadoRuta)

//habilitar puerto
const port=process.env.PORT||4000
const server=app.listen(port,()=>{
    console.log('Conectado al puerto '+port)
})

// manejador de error 404
app.use((req,res,next)=>{
    next(createError(404))
})

//manejador de errores
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode)err.statusCode=500
    res.status(err.statusCode).send(err.message)
})