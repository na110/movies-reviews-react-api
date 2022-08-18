import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  // I D    M O V I E    W I L L    D E S I PL A Y
  const { id } = useParams();

  // M O V I E    D E T A I L S
  const [movieDetails, setMovieDetails] = useState({});

  // G E T    D E T A I L S    M O V I E    F R O M    A P I    U S I N G    I D
  async function getMovieDetails(id) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6631b952254aa84000af325a07355fe0&language=en-US`
    );
    setMovieDetails(data);
  }

  useEffect(() => {
    getMovieDetails(id);
  }, []);
  return (
    <>
      {/* S T A R T    M O V I E    D E T A I L S    A R E A */}
      <section className="movie-details my-5">
        <div className="container">
          <div className="row align-items-start gap-3">
            <div className="col-md-4 border border-5 border-light p-0">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-md-6 ">
              <h1 className="mb-5">{movieDetails.original_title}</h1>
              <h4 className="mb-4">{movieDetails.tagline}</h4>
              <ul className="list-unstyled d-lg-flex gap-2 mb-5">
                {movieDetails.genres?.map((genre, index) => {
                  return (
                    <li
                      key={index}
                      className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0"
                    >
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
              <p className="mb-4">{`Vote : ${movieDetails?.vote_average}`}</p>
              <p className="mb-4">{`Vote Count : ${movieDetails.vote_count}`}</p>
              <p className="mb-4">{`Popularityt : ${movieDetails.popularity}`}</p>
              <p className="mb-4">{`Release Date : ${movieDetails.release_date}`}</p>
              <p className=" lh-lg  text-muted">{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </section>
      {/* E N D    M O V I E    D E T A I L S    A R E A */}
    </>
  );
}
