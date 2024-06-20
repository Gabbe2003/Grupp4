import { useNavigate } from "react-router-dom";
import { IMovie } from "../models/IMovie";

interface IMoviePresentationProps {
  movie: IMovie;
}

export const ProductPresentation = ({ movie }: IMoviePresentationProps) => {
  const navigate = useNavigate();

  return (
    <div className="startpage">
      <div className="movie-list">
        <div className="movie-item">
          <h3>{movie.name}</h3>
          <div className="movie-poster">
            <img src={movie.img} alt="No image is provided" />
          </div>
          <p>Price: {movie.price} SEK</p>
          <button
            className="product-button"
            onClick={() => {
              console.log(movie);
              navigate("/product/" + movie._id);
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};
