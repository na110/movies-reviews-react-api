import React, { useEffect, useState } from "react";
import axios from "axios";
import notfound from "../../assets/images/notFound.png";
import "./home.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShow, setTvShow] = useState([]);
  const [people, setPeople] = useState([]);
  const [allTrending, setAllTrending] = useState([]);

  async function getTrending(media, setItem) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${media}/day?api_key=6631b952254aa84000af325a07355fe0`
    );
    setItem(data.results);
  }

  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTvShow);
    getTrending("person", setPeople);
    getTrending("all", setAllTrending);
  }, []);

  return (
    <>
      {/* S T A R T    H O M E    A R E A */}
      <section className="home">
        <Header allTrending={allTrending} />
        <div className="container">
          <div className="row my-5">
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center mb-4 mb-md-0 ">
              <h2 className="fw-bold lh-base text-center text-md-start">
                Trending <br /> Movies <br /> to Watch Now
              </h2>
              <p className=" text-muted">Most watched movies by days</p>
            </div>
            {movies.slice(0, 7).map((movie) => {
              return (
                <div key={movie.id} className="col-md-3 mb-4">
                  <Link to={"/movie-details/" + movie.id} className="item">
                    <div className="box-img">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt=""
                      />
                    </div>
                    <h3 className="h6 fw-bold text-center mb-3 bg-black py-2 mt-2 rounded-2">
                      {movie.title ? movie.title : movie.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="row my-5">
            <div className="col-md-4 col-lg-3 d-flex flex-column justify-content-center align-items-center mb-4 mb-md-0 ">
              <h2 className="fw-bold lh-base text-center text-md-start">
                Trending <br /> Tv Show <br /> to Watch Now
              </h2>
              <p className=" text-muted">Most watched movies by days</p>
            </div>
            {tvShow.slice(0, 7).map((tv) => {
              return (
                <div
                  key={tv.id}
                  className="col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
                >
                  <Link to={"/tv-details/" + tv.id} className="item">
                    <div className="box-img">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                        alt=""
                      />
                    </div>
                    <h3 className="h6 fw-bold text-center bg-black py-2 mt-2 mb-0 rounded-2">
                      {tv.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="row my-5">
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center mb-4 mb-md-0 ">
              <h2 className="fw-bold lh-base text-center text-md-start">
                Trending <br /> People <br /> to Watch Now
              </h2>
              <p className=" text-muted">Most watched movies by days</p>
            </div>
            {people.slice(0, 7).map((person) => {
              return (
                <div key={person.id} className="col-md-3 mb-4">
                  <Link to={"/people-details/" + person.id} className="item">
                    <div className="box-img">
                      {" "}
                      {person.profile_path ? (
                        <img
                          className="w-100"
                          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                          alt=""
                        />
                      ) : (
                        <div className="not-found bg-light d-flex justify-content-center align-items-center">
                          <img className="w-100" src={notfound} alt="" />
                        </div>
                      )}
                    </div>
                    <h3 className="h6 fw-bold text-center mb-3 bg-black py-2 mt-2 rounded-2">
                      {person.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* E N D    H O M E    A R E A */}
    </>
  );
}
