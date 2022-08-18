import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transperant">
        <div className="container-fluid">
          <Link to="home" className="navbar-brand">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {props.userData ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="home" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="movies" className="nav-link">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="tvshow" className="nav-link">
                      Tv Show
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="people" className="nav-link">
                      People
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="about" className="nav-link">
                      About
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

            <div className="social-media d-flex gap-3 ms-auto my-4 my-lg-0">
              <a
                href="https://www.facebook.com/profile.php?id=100047862463742"
                className="nav-link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://github.com/na110"
                className="nav-link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/noah-adam-737408247/"
                className="nav-link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            {props.userData ? (
              <div className="userInfo ms-4 bg-success p-2 rounded-3">
                <span>{props.userName}</span>
              </div>
            ) : (
              ""
            )}

            <div className="registration ms-4">
              <ul className="navbar-nav">
                {props.userData ? (
                  <>
                    <li className="nav-item">
                      <span
                        role="button"
                        className="nav-link"
                        onClick={props.logOut}
                      >
                        Log Out
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="login" className="nav-link">
                        Log In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="register" className="nav-link">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
