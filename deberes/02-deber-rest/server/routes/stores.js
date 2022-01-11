const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

// Create document STORE
router.post("/", async (req, res) => {
    const store = new Store({
        id: req.body.id,
        location: req.body.location,
        responsable: req.body.responsable,
        openingHour: req.body.openingHour,
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
                    id: req.body.id,
                    location: req.body.location,
                    responsable: req.body.responsable,
                    openingHour: req.body.openingHour,
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