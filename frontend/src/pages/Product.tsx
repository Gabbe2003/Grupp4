import { useState } from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../models/IMovie";

export const Product = () => {
  const [movie, setMovie] = useState<IMovie>();

  const movieId = useParams();

  if (!movie) {
    fetch("http://localhost:9000/getAllMovies/" + movieId)
      .then((response: Response) => {
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      });
  }
  console.log(movie);
  console.log(movie);
  return (
    <>
      <h1>{movie?.name} </h1>
    </>
  );
};
