import { IMovie } from "../models/IMovie";
import { useEffect, useState } from "react";
import { ProductPresentation } from "./Productpresentation";

export const Startpage = () => {
  const [movies, setMovies] = useState<IMovie[]>();
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

  return (
    <>
      {movies?.map((movie) => {
        return <ProductPresentation key={movie._id} movie={movie} />;
      })}
    </>
  );
};
