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
        <div className="login-register-container">
          <a href="/loginUser">Logga in</a>
          <a href="/registerUser">Skapa konto</a>
        </div>
        <h1>Filmer</h1>

        <div className="movie-container">
          {movies?.map((movie) => {
            return (
              <div className="product-container">
                <ProductPresentation key={movie._id} movie={movie} />
                <button onClick={() => addToCart(movie)}>
                  Lägg i kundvagn
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cart">
        <h1>Kundvagn</h1>
        {cart && cart.length > 0 ? (
          cart.map((movie: IMovie) => {
            return <Cart key={movie.name} movie={movie} />;
          })
        ) : (
          <p>Kundvagnen är tom</p>
        )}

        <a
          className="payment-btn"
          href={
            cart && cart.length > 0
              ? `/checkout?products=` + JSON.stringify(cart)
              : "/checkout"
          }
        >
          Betala
        </a>
      </div>
    </div>
  );
};
