const mongoose = require('mongoose');//requerimos un modulo
const app = require('./app');//
const port = 3000;
console.log('hola')
mongoose.connect('mongodb://localhost:27017/bictiaPelis', {useNewUrlParser: true, useUnifiedTopology: true}, (error, res) => {
    if (error) {
        console.log("Error de conexión", error);
    } else {
        console.log("Nos conectamos correctamente.")
        app.listen(port, () => {
            console.log("Escuchando en el puerto:", port)
        })
    }

});//analizador del strin que tenemos
