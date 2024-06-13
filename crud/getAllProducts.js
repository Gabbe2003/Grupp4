const movies = require('../models/movies');

const getAllMovies = async (req, res) => {
    const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 6; 
    const skip = (page - 1) * limit; 

    try {
        const allMovies = await movies.find({}).skip(skip).limit(limit);
        const total = await movies.countDocuments({});

        return res.status(200).json({
            message: 'Here are the movies',
            total,
            page,
            pages: Math.ceil(total / limit),
            data: allMovies
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error.', error });
    }
}

module.exports = { getAllMovies };
