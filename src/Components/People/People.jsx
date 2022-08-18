import React, { useEffect, useState } from "react";
import axios from "axios";
import notfound from "../../assets/images/notFound.png";
import "./people.css";
import { Link } from "react-router-dom";

export default function People() {
  //  P E O P L E
  const [people, setPeople] = useState([]);

  // G E T    P E O P L E    F R O M    A P I
  async function getPeople() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/day?api_key=6631b952254aa84000af325a07355fe0`
    );
    setPeople(data.results);
  }

  useEffect(() => {
    getPeople();
  }, []);
  return (
    <>
      <section className="people my-5">
        <div className="container">
          <div className="row">
            {people.slice(0, 20).map((person) => {
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
    </>
  );
}
