const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlenght: 230 },
    category: { type: String, required: true },
    front: { type: String, required: true, minlength: 2, maxlength: 500 },
    back: { type: String, requiered: true, minlenght: 2, maxlenght: 500 },
    dateModified: { type: Date, default: Date.now },
});

const Flashcard = mongoose.model('Flascard', flashcardSchema);

function validateFlashcard(flashcard) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(230).required(),
        category: Joi.string().required(),
        front: Joi.string().min(2).max(500).required(),
        back: Joi.string().min(2).max(500).required(),
    });
    return schema.validate(flaschard);
}

exports.Flashcard = Flashcard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;