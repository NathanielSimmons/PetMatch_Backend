///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// start the mongoose db connection
require('./config/db.connection.js')

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const express = require("express");
const crypto = require("crypto");
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

// create application object
const app = express();

// Generate secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret key:', secretKey);

// Middleware
app.use(express.json());

///////////////////////////////
// ROUTES
////////////////////////////////

app.use('/api/users', userRoutes);
app.use('/api', petRoutes);

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
