require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cookieParser = require('cookie-parser');
const corsOptions = require('./settings/cors');
const PORT = 9000;
const http = require('http');
const app = express();
const server = http.createServer(app);
const moviesRouter = require('./routes/router');


app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));

const movies = require('./models/movies');

const dummyData = [
    { name: "Inception", price: 100 },
    { name: "Escape", price: 20 },
    { name: "TEST", price: 30 }
];

const initializeDummyData = async () => {
    try {
        await movies.deleteMany({});
        await movies.insertMany(dummyData);
        console.log('Dummy data has been created!', dummyData);
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};

initializeDummyData();

app.use('/', moviesRouter);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);

    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
