const movies = require('../models/movies');

const getAllMovies = async ( req, res ) => {

    try {
        const allMovies = await movies.find({});
        return res.status(200).json({ message: 'Here is the Movies', allMovies});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error.', error});
    }
}

module.exports = { getAllMovies };