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
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const matchRoutes = require('./routes/matchRoutes');

// create application object
const app = express();


// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
///////////////////////////////
// ROUTES
////////////////////////////////

app.use('/api/users', userRoutes);
app.use('/api', petRoutes);
app.use('/api/match', matchRoutes);
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
