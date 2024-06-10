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
const user = require('./models/user');

const dummyUsers = [
  {name: 'User1', email: 'test1@gmail.com'},
  {name: 'User1', email: 'test1@gmail.com'},
  {name: 'User1', email: 'test1@gmail.com'},
]

const dummyData = [
    { name: "Inception", price: 100 },
    { name: "Escape", price: 20 },
    { name: "TEST", price: 30 }
];

const initializeDummyData = async () => {
  try {
      const count = await movies.countDocuments({});

      if (count === 0) {
          await movies.insertMany(dummyData);
          console.log('Dummy data has been created!', dummyData);
      } else {
          console.log('Dummy data already exists. No need to create!',);
      }
  } catch (error) {
      console.error('Error checking or inserting dummy data:', error);
  }
};



const createUsersData = async () => {
  try {
      const count = await movies.countDocuments({});

      if (count === 0) {
          await movies.insertMany(dummyUsers);
          console.log('Users data has been created!', dummyUsers);
      } else {
          console.log('Users data already exists. No need to create!',);
      }
  } catch (error) {
      console.error('Error checking or inserting Users data:', error);
  }
};

initializeDummyData();
createUsersData();


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
