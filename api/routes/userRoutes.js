const express =require('express');
const UserController=require('../controllers/UserController');//Requerimos el controlador
let multipar=require('connect-multiparty');//npm install connect-multiparty --save
let imageDir=multipar({uploadDir:'./assets/images'});
const api=express.Router();
/**
 * POST:para insertar datos o enviar datos privados.
 * GET:Obtener datos.
 * PUT:Modificr informacion
 * DELETE:Eliminar informacion
 */
api.get('/saludo',(req,res)=>{
console.log("Primera ruta con express");

});

api.post('/createUser',UserController.create);

api.put('/updateUser/:id',UserController.update);


api.post('/loginUser',UserController.login);

api.put('/saveImage:id',imageDir,UserController.saveImage);

module.exports=api;//todas las rutas