const mongoose = require("mongoose");

// Schema
const ProductSchema = mongoose.Schema({
    Serie: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    datePurchase: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        required: true,
    },
    // Tienda
    tiendaID: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Products", ProductSchema)