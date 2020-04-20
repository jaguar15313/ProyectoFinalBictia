const express = require('express');
const bodyParser=require('body-parser');
const routes=require('./api/routes/userRoutes');
const movieRoutes=require('./api/routes/movieRoutes');

const app=express();
app.use(bodyParser.json());//Analiza los datos que se pasan por la url

app.use((req,res,next)=>{
 res.header('Access-Control-Allow-Origin','*');//configuramos todos los dominios

 res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');//Permitir todos los metadoatos y cookies.

 res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');//habilitar todos los metodos http.

 res.header('Allow','GET,POST,PUT,DELETE,OPTIONS');//Confirmacion de los metodos http

 next();
})

//CONFIGURAR CABECERAS HTTP

//RUTAS BASE
app.use('/api',routes);
app.use('/api', movieRoutes);

module.exports=app;