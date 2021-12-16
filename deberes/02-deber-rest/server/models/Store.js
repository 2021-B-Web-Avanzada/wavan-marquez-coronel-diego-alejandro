const mongoose = require("mongoose");

// Schema
const StoreSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    responsable: {
        type: String,
        required: true,
    },
    openingHour: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Stores", StoreSchema);