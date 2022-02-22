const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require('./database');

// Settings
app.set('port', 8080);

// Middlewares
app.use(express.json());    // Parse JSON
app.use(cors({origin: 'http://localhost:4200'}));

/* Routes */
// Store
const storeRoute = require('./routes/store.routes');
app.use('/store', storeRoute);
// Product
const productRoute = require('./routes/product.routes');
app.use('/store', productRoute);


// Start the server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});