import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import notfound from "../../assets/images/notFound.png";

export default function PeopleDetails() {
  // I D    P E R S O N    W I L L    D E S I PL A Y
  const { id } = useParams();

  // P E R S O N    D E T A I L S
  const [peopleDetails, setPeopleDetails] = useState({});

  // G E T    D E T A I L S    P E R S O N    F R O M    A P I    U S I N G    I D
  async function getPeopleDetails(id) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=6631b952254aa84000af325a07355fe0&language=en-US`
    );
    setPeopleDetails(data);
  }

  useEffect(() => {
    getPeopleDetails(id);
  }, []);
  return (
    <>
      {/* S T A R T    P E O P L E    D E T A I L S    A R E A */}
      <section className="people-details my-5">
        <div className="container">
          <div className="row align-items-center gap-3">
            <div className="col-md-4 border border-5 border-light p-0">
              {peopleDetails.profile_path ? (
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500/${peopleDetails.profile_path}`}
                  alt=""
                />
              ) : (
                <img className="w-100 p-5" src={notfound} alt="" />
              )}
            </div>
            <div className="col-md-6">
              <h2 className="mb-5">{peopleDetails.name}</h2>
              <h4 className="mb-4">{peopleDetails.known_for_department}</h4>
              <p className="mb-4">{`Birthday : ${peopleDetails.birthday}`}</p>
              <p className="mb-4">{`Place Of Birth : ${peopleDetails.place_of_birth}`}</p>
              <p className="mb-4 text-muted">
                {peopleDetails.biography
                  ? `${peopleDetails.biography?.slice(0, 500)}...`
                  : "Not Found"}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* E N D    P E O P L E    D E T A I L S    A R E A */}
    </>
  );
}
