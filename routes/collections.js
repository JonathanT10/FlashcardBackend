const { Collection } = require('../models/collection');
const { Flashcard, validate } = require('../models/flashcard');
const express = require('express');
const router = express.Router();

router.post('/:collectionId/cardcollection/:flashcardId', async (req, res) => {
    try{
        const collection = await Collection.findById(req.params.userId);
        if (!collection) return res.status(400).send('The collection with id "${req.params.collectionId}" does not exist');

        const flashcard = await Flashcard.findById(req.params.flashcardId);
        if (!flashcard) return res.status(400).send('The flashcard with id "${req.params.flashcardId}" does not exist.');

        collection.cardCollection.push(flashcard);

        await collection.save();
        return res.send(collection.cardCollection);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});




module.exports = router;