import React from "react";
import notfound from "../../assets/images/notFound.png";

export default function NotFound() {
  return (
    <>
      {/* S T A R T    N O T    F O U N D    A R E A */}
      <section className="not-found ">
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <div>
            <img className="w-100" src={notfound} alt="" />
          </div>
        </div>
      </section>
      {/* E N D    N O T    F O U N D    A R E A */}
    </>
  );
}
