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
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page > 1) {
      setPage(Number(page) - 1);
    }
  };
  const nextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page < totalPages) {
      setPage(Number(page) + 1);
    }
  };

  return (
    <div className="layout-container">
      <div className="header-container">
        {!user && (
          <div className="login-register-container">
            <a href="/loginUser">Log in</a>
            <a href="/registerUser">Create account</a>
          </div>
        )}

        {user && (
          <div>
            <a href="/" onClick={handleLogOut}>
              Log out
            </a>
          </div>
        )}
        <h1>Welcome {user && user.username}</h1>
        <h2>Movies</h2>

        <div className="movie-container">
          {movies?.map((movie) => {
            return (
              <div className="product-container" key={movie._id}>
                <ProductPresentation movie={movie} />
                <button onClick={() => addToCart(movie)}>Buy</button>
              </div>
            );
          })}
        </div>
        <div className="btn-container">
          <button onClick={previousPage}>Previous</button>
          <button onClick={() => nextPage()}>Next</button>
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
          className="payment-btn"
          href={
            cart && cart.length > 0
              ? `/checkout?products=` + JSON.stringify(cart)
              : "/"
          }
        >
          Check out
        </a>
      </div>
    </div>
  );
};
