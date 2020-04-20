const express =require('express');
const movieController=require('../controllers/movieController');//Requerimos el controlador
let multipar=require('connect-multiparty');//npm install connect-multiparty --save
// let imageDir=multipar({uploadDir:'./assets/images'});

const api=express.Router();
/**
 * POST:para insertar datos o enviar datos privados.
 * GET:Obtener datos.
 * PUT:Modificr informacion
 * DELETE:Eliminar informacion
 */


api.post('/createMovie',movieController.createMovie);

api.put('/updateMovie/:id',movieController.updateMovie);

/*
api.post('/loginUser',UserController.login);

api.put('/saveImage:id',imageDir,UserController.saveImage);*/

module.exports=api;//todas las rutas