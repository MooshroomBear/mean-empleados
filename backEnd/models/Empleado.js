const mongoose=require('mongoose')
const Schema =mongoose.Schema

let Empleado = new Schema({
    nombre:{
        type:String
    },
    departamento:{
        type:String
    },
    email:{
        type:String
    },
    telefono:{
        type:Number
    }
},{
    collection:'empleadosds02'

})
module.exports=mongoose.model('Empleado',Empleado)