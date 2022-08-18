import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import notfound from "../../assets/images/notFound.png";
import "./movies.css";

export default function Movies() {
  // P A G I N A T I O N    C O U N T
  let nums = new Array(13).fill(1).map((element, index) => index + 1);

  // M O V I E S
  const [movies, setMovies] = useState([]);
  // G E T    M O V I E S    F R O M    A P I
  async function getMovies(pageNumber = 1) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=6631b952254aa84000af325a07355fe0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
    setMovies(data.results);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {/* S T A R T    M O V I E S    A R E A */}
      <section className="movies my-5">
        <div className="container">
          <ul className="pagination pagination-sm d-flex justify-content-center mb-4">
            {nums.map((index) => (
              <li
                key={index}
                onClick={() => getMovies(index)}
                role="button"
                className="page-item "
                aria-current="page"
              >
                <span className="page-link">{index}</span>
              </li>
            ))}
          </ul>
          {movies ? (
            <div className="row">
              {movies.slice(0, 20).map((movie) => {
                return (
                  <div key={movie.id} className="col-md-3 mb-4">
                    <Link to={"/movie-details/" + movie.id} className="item">
                      <div className="box-img">
                        {" "}
                        {movie.poster_path ? (
                          <img
                            className="w-100"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt=""
                          />
                        ) : (
                          <div className="not-found bg-light d-flex justify-content-center align-items-center">
                            <img className="w-100" src={notfound} alt="" />
                          </div>
                        )}
                      </div>
                      <h3 className="h6 fw-bold text-center mb-3 bg-black py-2 mt-2 rounded-2">
                        {movie.title}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
        </div>
      </section>
      {/* E N D    M O V I E S    A R E A */}
    </>
  );
}
