const Movie = require("../models/Movie");
// const crypto = require("crypto");
const fs = require("fs");

/*function Crypto(password) {
  console.log("esta", password);
  let algorithm = "aes-256-cbc";
  let key = crypto.createCipher(algorithm, password);
  let encriptedPass = key.update(password, "utf8", "hex");
  encriptedPass += key.final("hex");
  console.log(encriptedPass);
  return encriptedPass;
}*/

function createMovie(req, res) {
  var movie = new Movie(); //esta es una nueva instacia del modelo user
  var params = req.body;

  movie.nameMovie = params.nameMovie;
  movie.category = params.category;
  movie.premiere = params.premiere;
//   movie.passwordAdmin = params.passwordAdmin;

  movie.save((error, movieCreated) => {
    if (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Error en el servidor"
      });
    } else {
      if (!movieCreated) {
        res.status(400).send({
          statusCode: 400,
          message: "Error al crear pelicula."
        });
      } else {
        res.status(200).send({
          statusCode: 200,
          message: "Pelicula creada Correctamente",
          userData: movieCreated
        });
      }
    }
  });
}


function updateMovie(req, res) {
     var parameters = req.body;
     var id = req.params.id;    

    console.log(parameters); 
    
        Movie.findByIdAndUpdate(id, parameters, (error, movieUpdated) => {
         
        if (error) {
             res.send({
                 message: 'Error en el servidor',
                 statusCode: 500
             })

         } else {
             if (!movieUpdated) {
                 res.send({
                     message: 'Error al actualizar pelicula',
                     statusCode: 400
                 })
             } else {
                 res.send({
                     message: 'Pelicula Actualizada',
                     statusCode: 200,
                     dataMovie:movieUpdated
                 })
             }
         }
     })
 }

/*
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
}*/
/**
 * Funcion la cual nos permite modificar  el avatar del usuario
 * @param {*} req //es para los que se envia en el body
 * @param {*} res //respuesta para el usuario
 */

/*function saveMovie(req, res) {
  let id = req.params.id;
  if (req.files) {
    let imageName = req.files.image.path.split("/").pop();
    user.findByIdAndUpdate(id, { image: imageName }, (error, dataUser) => {
      if (error) {
        res.send({
          statusCode: 500
        });
      } else {
        if (!dataUser) {
          res.send({
            statusCode: 401
          });
        } else {
          res.send({
            statusCode: 200,
            dataUser: dataUser
          });
        }
      }
    });
  }
}*/

module.exports = {
  createMovie,
  updateMovie
  //login,
  // saveImage,
};
