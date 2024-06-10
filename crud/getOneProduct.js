const movies = require('../models/movies');

const getMovieById = async (req,res) => {

    const { movieId } = req.params;
    try {
        const getOneMovie = await movies.findById(movieId);
        if(!getOneMovie) {
            return res.status(404).json({ message: 'No movie found'});
        }
        return res.status(200).json({ message: 'Movie', getOneMovie});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', error});
    }
}

module.exports = { getMovieById };