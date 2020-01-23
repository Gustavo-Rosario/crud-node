const { Schema, model }     = require('mongoose');

const AnimalSchema = new Schema({
    nome:   { type: String, required: true },
    peso:   { type: Number, required: true },
    idade:  { type: Number, reqiured: true },
    tipo:   { type: String, required: true }
});

module.exports = model('Animal', AnimalSchema, 'animals');