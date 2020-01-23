const { Schema, model }     = require('mongoose');

/** 
 * Enum de tipos
 * @readonly
 * @enum {string}
 */
const TIPOS = [
    'TIPO1',
    'TIPO2',
    'TIPO3'
];

const AnimalSchema = new Schema({
    nome:   { type: String, required: true, unique: true },
    peso:   { type: Number, required: true },
    idade:  { type: Number, required: true },
    tipo:   { type: String, enum: TIPOS, required: true }
});

AnimalSchema.statics.TIPOS = TIPOS;

module.exports = model('Animal', AnimalSchema, 'animals');