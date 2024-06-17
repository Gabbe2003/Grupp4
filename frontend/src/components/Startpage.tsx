import { IMovie } from "../models/IMovie";
import { useEffect, useState } from "react";
import { ProductPresentation } from "./Productpresentation";
import { Cart } from "./Cart";
import Cookies from "universal-cookie";

export const Startpage = () => {
  const [movies, setMovies] = useState<IMovie[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [cart, setCart] = useState<any>([]);
  const cookie = new Cookies();
  const user = cookie.get("user");
  useEffect(() => {
    console.log(page);

    fetch(`http://localhost:9000/getAllMovies?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovies(data.data);
        setTotalPages(data.pages);
        console.log(data.pages);
      });
  }, [page]);

  const addToCart = (product: any) => {
    setCart((cart: any) => [...cart, product]);
  };
  const handleLogOut = () => {
    cookie.remove("user");
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(Number(page) - 1);
    }
  };
  const nextPage = () => {
    if (page < totalPages) {
      setPage(Number(page) + 1);
    }
  };
  return (
    <div className="layout-container">
      <div className="header-container">
        {!user && (
          <div className="login-register-container">
            <a href="/loginUser">Logga in</a>
            <a href="/registerUser">Skapa konto</a>
          </div>
        )}

        {user && (
          <div>
            <a href="/" onClick={handleLogOut}>
              Logga ut
            </a>
          </div>
        )}
        <h1>Välkommen {user && user.username}</h1>
        <h2>Filmer</h2>

        <div className="movie-container">
          {movies?.map((movie) => {
            return (
              <div className="product-container" key={movie._id}>
                <ProductPresentation movie={movie} />
                <button onClick={() => addToCart(movie)}>
                  Lägg i kundvagn
                </button>
              </div>
            );
          })}
        </div>
        <div className="btn-container">
          <button onClick={previousPage}>Tillbaka</button>
          <button onClick={() => nextPage()}>Nästa sida</button>
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
