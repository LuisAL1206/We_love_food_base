const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { Comida, items } = require('./comida')
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

app.delete('/delete/food:id', (req, res) => {
    const { id } = req.params;
    Comida.findByIdAndDelete(id).exec()
        .then(comida => res.status(200).send({ message: 'Se ha borrado exitosamente', comida: comida }))
        .catch(error => res.status(409).send({ message: 'No se ha podido borrar el platillo', error: error }))
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    Comida.findByIdAndUpdate(id, {$set:req.body },{ new: true }).exec()
        .then(comida => res.status(200).send({ message: 'Se ha actualizado exitosamente', comida: comida }))
        .catch(error => res.status(409).send({ message: 'No se ha podido actualizar el platillo', error: error }))
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
        carrito,
    } = req.body

    const newFood = Comida({
        platillo,
        ingredientes,
        picante,
        precio,
        restaurante,
        img_platillo,
        descripcion,
        carrito,
    });


    newFood.save((err, documentoComida) => {
        err
            ? res.status(400).send(err)
            : res.status(201).send({ message: 'Has publicado un nuevo Antojito', comida: documentoComida })
    });
});


//carrito

app.post('/carrito', (req, res) => {
    const {
        Nombre,
        addProducts,
        Total
    } = req.body

    const newCar = items({
        Nombre,
        addProducts,
        Total
    });
    newCar.save((err, carrito) => {
        err
            ? res.status(400).send(err)
            : res.status(201).send({ message: 'Has publicado un nuevo carrito de compras', carrito: carrito })
    })
});


app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`)
});