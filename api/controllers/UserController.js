const User = require('../models/User');//Esportamos el modelo de usuarios
const crypto = require('crypto');//libreria de encriptacion 
const fs =require('fs')//se valida la imagen del usuario xi existe

/**
 * Función para un usuario.
 * @param {*} req :Viene porla url
 * @param {*} req :Respuesta que retorna
 * 
 */
function create(req,res){
    var user = new User();//esta es una nueva instacia del modelo user
    var params = req.body;

    user.firstName =params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password=Crypto(params.password);

    user.save((error,userCreated)=>{
   
        if(error){
         res.status(500).send({
             statusCode:500,
             message: 'Error en el servidor'
         })
        }else{
           if(!userCreated){
              res.status(400).send({
                statusCode:400,
                message: 'Error al crear el usuario.'
              })
           }else{
               res.status(200).send({
                   statusCode: 200,
                   message:'Usuaro creado Correctamente',
                   userData:userCreated
               })

           }

        }

    });



}
function update(req, res) {
    var parameters = req.body;//traer los datos del formulario;
    var id = req.params.id;
    let password = parameters.password;

    /**  let password=parameters.password;
     let algorithm='aes-256-cbc';
     let key=crypto.createCipher(algorithm,password);
     let encriptedPass=key.update(password,'utf8','hex');
     encriptedPass +=key.final('hex');
     parameters.password=encriptedPass;
     */

    if (password != undefined && password != '') {
        parameters.password = Crypto(password);
    }
    //busca una oleccion por su Id y la actualiza
    User.findByIdAndUpdate(id, parameters, (error, userUpdated) => {
        if (error) {
            res.send({
                message: 'Error en el servidor',
                statusCode: 500
            })

        } else {
            if (!userUpdated) {
                res.send({
                    message: 'Error al actualizar el usuario',
                    statusCode: 400
                })
            } else {
                res.send({
                    message: 'Usuario Actualizado',
                    statusCode: 200,
                    dataUser:userUpdated
                })
            }
        }
    })
}

function Crypto(password) {
    console.log('esta',password)
    let algorithm = 'aes-256-cbc';
    let key = crypto.createCipher(algorithm, password);
    let encriptedPass = key.update(password, 'utf8', 'hex');
    encriptedPass += key.final('hex');
    console.log(encriptedPass);
    return encriptedPass


}
function login(req, res) {
    let params = req.body;
    User.findOne({ email: params.email },
        (error, userLogged) => {
            if (error) {
                res.status(500).send({
                    message: 'Error en el servidor',
                    statusCode: 500
                })
            } else {
                if (!userLogged) {
                    res.send({
                        menssage: 'El usuario no existe',
                        statusCode: 400

                    })
                } else {
                    let password = Crypto(params.password)
                    if (password === userLogged.password) {
                        res.send({
                            menssage: 'Los datos son correctos',
                            statusCode: 200,
                            dataUser:userLogged//devuelve todo lo del usuario
                        })

                    } else {
                        res.send({
                            message: 'Los datos no son correctos',
                            statusCode: 401
                        })

                    }

                }

            }

        })
}
/**
 * Funcion la cual nos permite modificar  el avatar del usuario
 * @param {*} req //es para los que se envia en el body
 * @param {*} res //respuesta para el usuario
 */
function saveImage(req,res){
 let id=req.params.id;
 if(req.files){
 let imageName=req.files.image.path.split('/').pop();
 //obtener el nobre de la imagen el split parte una cadena or un caracter
 //pop() se octiene el ultimo lugar del arreglo
 user.findByIdAndUpdate(id,{image:imageName},(error,dataUser)=>{
  if(error){
      res.send({
          statusCode: 500
      })
    
  }else{
      if(!dataUser){
     res.send({
         statusCode: 401
     })
      }else{
       res.send({
          statusCode: 200,
          dataUser: dataUser 
       })
      }

  }

 });//Funcion recive dos parametros que es loq ue queremos modificar
 }

}
module.exports = {
    create,
    update,
    login,
    saveImage,
   
}