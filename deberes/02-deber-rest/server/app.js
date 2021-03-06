const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv/config");

const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());

// Start the service
app.listen(PORT, () => {
    console.log(`Started at http://localhost:${PORT}`);
});
app.use(cors({origin: 'http://localhost:4200'}));
app.get("/", (req, res) => {
    res.send("API\nDiego Marquez");
});

/* Routes */
// Stores
const storesRoute = require("./routes/stores");
app.use("/store", storesRoute);
// Products
const productsRoute = require("./routes/products");
app.use("/store", productsRoute);

// Database connection
mongoose.connect(
    process.env.MongoDB,
    () => {
        console.log("Success!")
    }
);