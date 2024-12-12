// Environment Variables 
require('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger'); // Database
const logger = require('./logger'); // App
const path = require('path');
const pinoHttp = require('pino-http');

//Database Connection
const connectToDatabase = require('./models/db');
const {loadData} = require("./util/import-mongo/index");

// Route files
const secondChanceRoutes = require('./routes/secondChanceItemsRoutes');
const searchRoutes = require('./routes/searchRoutes');

// App
const app = express();

// Middleware
app.use("*",cors());
app.use(express.json());
app.use(pinoHttp({ logger }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB; we just do this one time
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to DB')
    })
    .catch((e) => {
        console.error('Failed to connect to DB', e)
    });

// Use Routes
app.use('/api/secondchance/items', secondChanceRoutes);
app.use('/api/secondchance/search', searchRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/",(req,res)=>{
    res.send("Inside the server")
})

const port = 3060;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});