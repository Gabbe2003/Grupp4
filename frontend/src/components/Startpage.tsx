import { IMovie } from "../models/IMovie";
import { useEffect, useState } from "react";
import { ProductPresentation } from "./Productpresentation";
import { Cart } from "./Cart";

export const Startpage = () => {
  const [movies, setMovies] = useState<IMovie[]>();
  const [cart, setCart] = useState<any>([]);
  useEffect(() => {
    if (!movies) {
      fetch("http://localhost:9000/getAllMovies")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setMovies(data.data);
          console.log(data.data);
        });
    }
  }, []);
  const addToCart = (product: any) => {
    setCart((cart: any) => [...cart, product]);
  };
  console.log(cart);
  return (
    <div className="layout-container">
      <div className="header-container">
        <h1>Movies</h1>

        <div className="movie-container">
          {movies?.map((movie) => {
            return (
              <div className="product-container">
                <ProductPresentation key={movie._id} movie={movie} />
                <button onClick={() => addToCart(movie)}>Add to cart</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cart">
        <h1>Cart</h1>
        {cart && cart.length > 0 ? (
          cart.map((movie: IMovie) => {
            return <Cart key={movie.name} movie={movie} />;
          })
        ) : (
          <p>Cart is empty</p>
        )}

        <a
          href={
            cart && cart.length > 0
              ? `/checkout?products=` + JSON.stringify(cart)
              : "/checkout"
          }
        >
          To checkout
        </a>
      </div>
    </div>
  );
};
