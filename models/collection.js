const mongoose = require('mongoose');
const Joi = require('joi');
const { flashcardSchema } = require('./flashcard');


const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cardCollection: { type: [flashcardSchema], defualt: [] },
});

const Collection = mongoose.model('Collections', collectionSchema);

function validateCollection(collection) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(user);
}

exports.Collection = Collection;
exports.validate = validateCollection;
exports.collectionSchema = collectionSchema;