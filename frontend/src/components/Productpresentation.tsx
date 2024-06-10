import { useNavigate } from "react-router-dom";
import { IMovie } from "../models/IMovie";

interface IMoviePresentationProps {
  movie: IMovie;
}

export const ProductPresentation = ({ movie }: IMoviePresentationProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="startpage">
        <h1>Movies</h1>
        <div className="movie-list">
          <div className="movie-item">
            <h3>{movie.name}</h3>
            <p>{movie.price}</p>
            <button
              onClick={() => {
                navigate("/pages/Product/" + movie._id);
              }}
            >
              Visa mer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
