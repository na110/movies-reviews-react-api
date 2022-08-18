import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tvshow.css";
import { Link } from "react-router-dom";

export default function TvShow() {
  // P A G I N A T I O N    C O U N T
  let nums = new Array(13).fill(1).map((element, index) => index + 1);

  // T V    S H O W
  const [tvShow, setTvShow] = useState([]);

  // G E T    T V    S H O W    F R O M    A P I
  async function getTvShow(pageNumber = 1) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=6631b952254aa84000af325a07355fe0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
    setTvShow(data.results);
  }

  useEffect(() => {
    getTvShow();
  }, []);
  return (
    <>
      {/* S T A R T    T V    S H O W    D E T A I L S    A R E A */}
      <section className="tv-show my-5">
        {tvShow ? (
          <div className="container">
            <ul className="pagination pagination-sm d-flex justify-content-center mb-4">
              {nums.map((index) => (
                <li
                  key={index}
                  onClick={() => getTvShow(index)}
                  role="button"
                  className="page-item "
                  aria-current="page"
                >
                  <span className="page-link">{index}</span>
                </li>
              ))}
            </ul>
            <div className="row">
              {tvShow.slice(0, 20).map((tv) => {
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
          </div>
        ) : (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        )}
      </section>
      {/* E N D    T V    S H O W    D E T A I L S    A R E A */}
    </>
  );
}
