const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { Comida } = require('./comida')
console.log(Comida)

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.get('/food', (request, response) => {

    response.send({ message: 'Server on' })
})

app.get('/all/food', (req, res) => {
    Comida.find().populate().exec()
        .then(comidas => res.send(comidas))
        .catch(err => res.status(409).send(err));
});

app.delete('/delete/food:id',(req,res)=>{
    const { id } = req.params;
    Comida.findByIdAndDelete(id).exec()
    .then(comida => res.status(200).send({message:'Se ha borrado exitosamente',comida:comida}) )
    .catch(error => res.status(409).send({message:'No se ha podido borrar el platillo',error:error}))
});

app.post('/create/food', (req, res) => {
    const {
        platillo,
        ingredientes,
        picante,
        precio,
        restaurante,
        img_platillo,
        descripcion,
    } = req.body

    const newFood = Comida({
        platillo,
        ingredientes,
        picante,
        precio,
        restaurante,
        img_platillo,
        descripcion,
    });

    
    newFood.save((err, documentoComida) => {
        err
            ? res.status(400).send(err)
            : res.status(201).send({ message: 'Has publicado un nuevo Antojito', comida: documentoComida })
    });
});



app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`)
});