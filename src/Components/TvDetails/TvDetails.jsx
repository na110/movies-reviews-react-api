import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TvDetails() {
  // I D    T V    S H O W    W I L L    D E S I PL A Y
  const { id } = useParams();

  // T V    S H O W    D E T A I L S
  const [tvDetails, setTvDetails] = useState({});

  // G E T    D E T A I L S    T V    S H O W    F R O M    A P I    U S I N G    I D
  async function getTvDetails(id) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=6631b952254aa84000af325a07355fe0&language=en-US`
    );
    setTvDetails(data);
  }

  useEffect(() => {
    getTvDetails(id);
  }, []);

  return (
    <>
      {/* S T A R T    T V    S H O W    A R E A */}
      <section className="movie-details my-5">
        <div className="container">
          <div className="row  align-items-start gap-3">
            <div className="col-md-4 border border-5 border-light p-0">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500/${tvDetails.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <h1 className="mb-5">{tvDetails.original_name}</h1>
              <h4 className="mb-4">{tvDetails.tagline}</h4>
              <ul className="list-unstyled d-lg-flex gap-2 mb-5">
                {tvDetails.genres?.map((genre, index) => {
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
              <p className="mb-4">{`Vote : ${tvDetails.vote_average}`}</p>
              <p className="mb-4">{`Vote Count : ${tvDetails.vote_count}`}</p>
              <p className="mb-4">{`Popularityt : ${tvDetails.popularity}`}</p>
              <p className="mb-4">{`Release Date : ${tvDetails.first_air_date}`}</p>
              <p className=" lh-lg">{tvDetails.overview}</p>
            </div>
          </div>
        </div>
      </section>
      {/* E N D    T V    S H O W    A R E A */}
    </>
  );
}
