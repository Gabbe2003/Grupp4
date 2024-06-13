import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IMovie } from "../models/IMovie";

export const Product = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (movieId && !movie) {
          const response = await axios.get(
            `http://localhost:9000/getAllMovies/${movieId}`
          );
          setMovie(response.data.getOneMovie);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchMovie();
  }, [movieId, movie]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <div className="single-product-container">
        <h1>{movie.name}</h1>
        <div className="single-product__startpage">
          <div className="single-product__movie-list">
            <div className="single-product__movie-item">
              <div className="single-product__movie-poster">
                <img src={movie.img} />
              </div>
              <h4>Handling</h4>
              <p>{movie.desc}</p>
              <h4>Pris: {movie.price} SEK</h4>
              <a href="/">Tillbaka till startsidan</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
