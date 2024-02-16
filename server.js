require("dotenv").config();


require('./config/db.connection.js')


const { PORT } = process.env;


const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const matchRoutes = require('./routes/matchRoutes');


const app = express();



app.use(express.json());
app.use(cors({
    origin: 'https://pet-match-frontend.vercel.app'
  }));


app.use('/api/users', userRoutes);
app.use('/api', petRoutes);
app.use('/api/match', matchRoutes);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
