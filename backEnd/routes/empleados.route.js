const express = require('express')
const app = express()
const empleadoRuta=express.Router()

let Empleado=require('../models/Empleado')
//agregar un nuevo empleado
empleadoRuta.route('/create').post((req,res,next)=>{
    Empleado.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//obtenemos todos los empleados
empleadoRuta.route('/empleados').get((res,req,next)=>{
    Empleado.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//obtener un solo empleado pr id
empleadoRuta.route('/empleado/:id').get((res,req,next)=>{
    Empleado.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//actualizar un empleado
empleadoRuta.route('/update/:id').put((req,res,next)=>{
    Empleado.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

//eliminar empleado
empleadoRuta.route('/delete/:id').delete((res,req,next)=>{
    Empleado.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

module.exports=empleadoRuta;