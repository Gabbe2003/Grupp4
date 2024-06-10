const express = require("express");
const router = express.Router();

const allMovies = require("../crud/getAllProducts");
const getOneMovie = require("../crud/getOneProduct");

router.get("/getAllMovies", allMovies.getAllMovies);
router.get("/getAllMovies/:movieId", getOneMovie.getMovieById);

module.exports = router;
