const express = require("express");
const router = express.Router();

const allMovies = require('../crud/getAllProducts');
const getOneMovie = require('../crud/getOneProduct');
const registerUser = require('../userOperations/register');
const loginUser = require('../userOperations/loginUser');

router.get('/getAllMovies', allMovies.getAllMovies);
router.get('/getAllMovies/:movieId', getOneMovie.getMovieById);
router.post('/registerUser', registerUser.registerUser);
router.post('/loginUser', loginUser.loginUser);

module.exports = router;
