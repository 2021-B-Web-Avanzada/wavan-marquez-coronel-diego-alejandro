const mongoose = require("mongoose");

// Schema
const ProductSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    unidad: {
        type: Number,
        required: true
    },
    fechaAdquisicion: {
        type: Date,
        default: Date.now,
    },
    precio: {
        type: Number,
        required: true,
    },
    // Store
    storeID: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Product', ProductSchema)