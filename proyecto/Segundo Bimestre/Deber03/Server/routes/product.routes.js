const express = require('express');
const router = express.Router();
const Product = require("../models/product.js");
const path = "/:storeID/product";

// Create document PRODUCT
router.post(path, async (req, res) => {
    const product = new Product({
        nombre: req.body.nombre,
        marca: req.body.marca,
        unidad: req.body.unidad,
        fechaAdquisicion: req.body.fechaAdquisicion,
        precio: req.body.precio,
        // Store
        storeID: req.params.storeID,
    });

    try {
        const promise = await product.save();
        res.json(promise);
    } catch (e) {
        res.json({message: e});
    }
});

// Read all documents
router.get(path, async (req, res) => {
    try {
        const products = await Product.find({storeID: req.params.storeID});
        res.json(products);
    } catch (e) {
        res.json({message: e});
    }
});

// Read document by ID
router.get(`${path}/:productID`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productID);
        res.json(product);
    } catch (e) {
        res.json({message: e});
    }
});

// Update document by ID
router.patch(`${path}/:productID`, async (req, res) => {
    try {
        const product = await Product.updateOne(
            { _id: req.params.productID },
            { $set: {
                    nombre: req.body.nombre,
                    marca: req.body.marca,
                    unidad: req.body.unidad,
                    fechaAdquisicion: req.body.fechaAdquisicion,
                    precio: req.body.precio,
                    storeID: req.body.storeID,
                } }
        );
        res.json(product);
    } catch (e) {
        res.json({message: e});
    }
});

// Delete document by ID
router.delete(`${path}/:productID`, async (req, res) => {
    try {
        const product = await Product.remove(
            { _id: req.params.productID }
        );
        res.json(product);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;