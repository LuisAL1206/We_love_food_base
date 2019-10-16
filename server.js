const express = require('express');
const bodyParser = require('body-parser');

const { Comida } = require('./comida')
console.log(Comida)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 4005;

app.get('/', (request, response) => {
    response.send({ message: 'Server on' })
})

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
    })
});


app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`)
});