const express = require('express');
const router = express.Router();
const Store = require("../models/store.js");

// Create document STORE
router.post("/", async (req, res) => {
    const store = new Store({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        area: req.body.area,
        fechaApertura: req.body.fechaApertura,
        estrellas: req.body.estrellas,
    });

    // Save to DB
    try {
        const promise = await store.save();
        res.json(promise);
    } catch (e) {
        res.json({message: e});
    }
});

// Read all documents
router.get("/", async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (e) {
        res.json({message: e});
    }
});

// Read document by ID
router.get("/:storeID", async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeID);
        res.json(store);
    } catch (e) {
        res.json({message: e});
    }
});

// Update document by ID
router.patch("/:storeID", async (req, res) => {
    try {
        const store = await Store.updateOne(
            { _id: req.params.storeID },
            { $set: {
                    nombre: req.body.nombre,
                    direccion: req.body.direccion,
                    area: req.body.area,
                    fechaApertura: req.body.fechaApertura,
                    estrellas: req.body.estrellas,
                }}
        );
        res.json(store);
    } catch (e) {
        res.json({message: e});
    }
});

// Delete document by ID
router.delete("/:storeID", async (req, res) => {
    try {
        const store = await Store.remove(
            { _id: req.params.storeID }
        );
        res.json(store);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;