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
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:5173', 'https://pet-match-frontend.vercel.app'] 
    : 'https://pet-match-frontend.vercel.app'
};
app.use(cors(corsOptions));

//Server status endpoint
app.get('/', (req, res) => {
  res.send('Server is Up!');
});

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/match', matchRoutes);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
