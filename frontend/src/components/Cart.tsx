import { IMovie } from "../models/IMovie";
interface IMovieCartProps {
  movie: IMovie;
}
export const Cart = ({ movie }: IMovieCartProps) => {
  return (
    <div className="cart-start">
      <div className="cart-list">
        <div className="cart-item">
          <h3>{movie.name}</h3>
          <p>{movie.price}</p>
        </div>
      </div>
    </div>
  );
};
