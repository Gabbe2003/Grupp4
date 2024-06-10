import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { IMovie } from "../models/IMovie";

export const Product = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (movieId && !movie) {
          const response = await axios.get(`http://localhost:9000/getAllMovies/${movieId}`);
          setMovie(response.data.getOneMovie); 
          console.log(response)

        }
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovie();
  }, [movieId, movie]);

  if (!movie) return <div>Loading...</div>; 

  return (
    <>
      <h1>{movie.name}</h1> 
      <h1>{movie.price}</h1> 
    </>
  );
};
