const mongoose = require('mongoose');

const URL_MONGO = "mongodb+srv://AL1206:12345al@cluster0-4smrv.mongodb.net/Comida?retryWrites=true&w=majority";

mongoose.connect(URL_MONGO, { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log('Conexión existosa con mongoDB')
    } else {
        console.log(error)
    }
})

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    platillo: String,
    ingredientes: [String],
    picante: {
        type: String,
        enum: ['Nada', 'Poco', 'Medio', 'Picante', 'Muy Picante']
    },
    precio: {
        type: Number,
    },
    restaurante: String,
    img_platillo: String,
    descripcion: String,
    carrito: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]

}, { timestamps: true });

const itemsSchema = new Schema ({
    Nombre: String,
    addProducts: [],
    Total: Number

})

const carritoSchema = new Schema ({
    
}, {timestamps:true})


const Comida = mongoose.model('Comida', foodSchema);
const Carrito = mongoose.model('carrito', carritoSchema);
const items = mongoose.model('items', itemsSchema)

module.exports = {
    Comida,
    Carrito,
    items
}