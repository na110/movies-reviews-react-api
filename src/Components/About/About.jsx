import React from "react";

export default function About() {
  return (
    <>
      <section className="about my-5">
        <div className="container">
          <h1 className="mb-4">Noxe | Movies Reviews</h1>
          <p className="fs-4 text-muted lh-lg mb-5">
            Creative website uniquely designed for show Millions of movies, TV
            shows and people to discover . It is based on the famous library
            React and Bootstrap5 responsive frameworks and contains
            well-commented code for ease of use.
          </p>
          <p className="fs-4 text-success"> Design By :</p>
          <ul className="list-unstyled d-lg-flex gap-2 mb-5">
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">
              HTML5
            </li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">CSS3</li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">
              Bootstrap
            </li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">
              JavaScript
            </li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">
              React
            </li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">Api</li>
            <li className="p-2 bg-primary mx-2 rounded-2 mb-2 mb-lg-0">Ajax</li>
          </ul>

          <p className="text-center fixed-bottom my-5">
            Made With By{" "}
            <a
              className="text-primary"
              role="referd"
              href="https://github.com/na110"
              target="_blank"
            >
              Noah Adam
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
