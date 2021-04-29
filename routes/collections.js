const { Collection } = require('../models/collection');
const { Flashcard, validate } = require('../models/flashcard');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const collections = await Collection.find();
        return res.send(collections);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if (!collection)
            return res.status(400).send('The collection with id "${req.params.id}" does not exist.');

            return res.send(collection);

    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});

router.get('/:collectionId/:flashcardId', async (req, res) => {
    try{

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send('The collection with id "${req.params.collectionId}" does not exist');

        const flashcard = await Flashcard.findById(req.params.flashcardId);
        if (!flashcard) return res.status(400).send('The flashcard with id "${req.params.flashcardId}" does not exist.');

        return res.send(collection, flashcard);

    }catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});


router.post('/:collectionId/cardcollection/:flashcardId', async (req, res) => {
    try{
        const collection = await Collection.findById(req.params.collectionId);
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

router.post('/:collectionId/cardcollection/:flashcardId', async (req, res) => {
    try{
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send('The collection with id "${req.params.collectionId}" does not exist');

        const flashcard = new Flashcard({
            name: req.body.name,
            category: req.body.category,
            front: req.body.front,
            back: req.body.back,
        });

        await flashcard.save();


        collection.cardCollection.push(flashcard);

        await collection.save();
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});



router.put('/:collectionId/cardcollection/:flashcardId', async (req, res) => {
    try { 
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send('The collection with id "${req.params.collectionId}" does not exist.');

        const flashcard = collection.cardCollection.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send('The flashcard with id "${req.params.flaschardId}" does not exist in this collection.');

        flashcard.name = req.body.name;
        flashcard.category = req.body.category;
        flashcard.front = req.body.front;
        flashcard.back = req.body.back;
        flashcard.dateModified = Date.now();

        await collection.save();
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});


router.delete('/:collectionId/cardcollection/:flashcardId', async (req, res) => {
    try { 

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send('The user with id "${req.params.collectionId}" does not exist.');

        let flashcard = collection.cardCollection.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send('The flashcard with id "${req.params.flashcardId}" does not exist in this collection.');

        flashcard = await flashcard.remove();

        await collection.save();
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});

router.delete('/:collectionId', async (req, res) => {
    try {
        const collection = await Collection.findByIdAndRemove(req.params.collectionId);

        if (!collection) 
            return res.status(400).send('The collection with id "${req.params.collectionId}" does not exist.');

            return res.send(collection);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});

router.post('/', async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send(error);

        const collection = new Collection({
            name: req.body.name,
        });
        
        await collection.save();

        return res.send(collection);
    }catch (ex) {
        return res.status(500).send('Internal Server Error: ',"${ex}")
    }
});

module.exports = router;