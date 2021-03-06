const { Flashcard, validate } = require('../models/flashcard');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        return res.send(flashcards);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findById(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);

            return res.send(flashcard);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
        return res.status(400).send(error);

        const flashcard = new Flashcard({
            name: req.body.name,
            category: req.body.category,
            front: req.body.front,
            back: req.body.back,
        });

        await flashcard.save();

        return res.send(flashcard);

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                front: req.body.front,
                back: req.body.back,
            },
            { new: true }
        );

        if (!flashcard)
            return res.status(400).send(`The flashcar with is "${req.params.id}" does not exist.`);

            await flashcard.save();

            return res.send(flashcard);  
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

            return res.send(flashcard);
    
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;