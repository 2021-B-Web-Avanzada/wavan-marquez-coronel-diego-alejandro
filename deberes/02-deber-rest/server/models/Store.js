const mongoose = require("mongoose");

// Schema
const StoreSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    fechaApertura: {
        type: Date,
        default: Date.now,
    },
    estrellas: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Stores", StoreSchema);