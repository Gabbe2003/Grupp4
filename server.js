require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cookieParser = require("cookie-parser");
const corsOptions = require("./settings/cors");
const PORT = 9000;
const http = require("http");
const app = express();
const server = http.createServer(app);
const moviesRouter = require("./routes/router");

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));

const movies = require('./models/movies');
const user = require('./models/user');
// const data = require('./models/dummyData');

const dummyData = [
  { name: "Inception",desc:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",img:"https://m.media-amazon.com/images/I/71SBgi0X2KL._AC_UF1000,1000_QL80_.jpg",price: 129 },
  { name: "Die Hard",desc:"A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",img:"https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg", price: 119 },
  { name: "Shawshank redemption",desc:"Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",img:"https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",price:145},
  { name: "The Terminator",desc:"A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",img:"https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",price: 99},
  { name: "Braveheart",desc:"Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",img:"https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",price:199},
  { name: "The Last of the Mohicans", desc:"Three trappers protect the daughters of a British Colonel in the midst of the French and Indian War.",img:"https://m.media-amazon.com/images/M/MV5BZDNiYmRkNDYtOWU1NC00NmMxLWFkNmUtMGI5NTJjOTJmYTM5XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg", price: 99},
  { name: "The Gladiator", desc: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", img:"https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", price: 199},
  { name: "The Departed", desc: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.", img: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg", price:149},
  { name: "Shutter Island", desc: "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.", img: "https://d2iltjk184xms5.cloudfront.net/uploads/photo/file/462044/0efe1674bbc2af91a7b31e310ab7e5aa-Shutter_20Island.jpg", price:159},
  { name: "The Expandebles", desc: "A CIA operative hires a team of mercenaries to eliminate a Latin dictator and a renegade CIA agent.", img: "https://m.media-amazon.com/images/M/MV5BNTUwODQyNjM0NF5BMl5BanBnXkFtZTcwNDMwMTU1Mw@@._V1_.jpg", price: 179 },
  { name: "The Transporter", desc:'Frank Martin, who "transports" packages for unknown clients, is asked to move a package that soon begins moving, and complications arise.',img: "https://m.media-amazon.com/images/M/MV5BMTk2NDc2MDAxN15BMl5BanBnXkFtZTYwNDc1NDY2._V1_FMjpg_UX1000_.jpg",price:139},
  { name: "Crank", desc: "Professional assassin Chev Chelios learns his rival has injected him with a poison that will kill him if his heart rate drops.", img:"https://m.media-amazon.com/images/M/MV5BMTQzNTU1ODkxNl5BMl5BanBnXkFtZTcwMDgyODEzMg@@._V1_.jpg", price:189},
];

const dummyUsers = [
  {username: 'User1', email: 'test1@gmail.com', password:'Test1!'},
  {username: 'user2', email: 'test2@gmail.com', password:'Test2!'},
  {username: 'User3', email: 'test3@gmail.com', password:'Test3!'},
]



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
      const count = await user.countDocuments({});

      if (count === 0) {
          await user.insertMany(dummyUsers);
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


app.use("/", moviesRouter);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
