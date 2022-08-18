import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

export default function LogIn(props) {
  const navigate = useNavigate();

  // S A F E    U S E R    I N F O R M A T I O N
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // E R R O R    V A L I D A T I O N    J O I
  const [errorJoi, setErrorJoi] = useState([]);

  // E R R O R    V A L I D A T I O N    A P I
  const [errorApi, setErrorApi] = useState("");

  // L O A D I N G    C O N D I T I O N
  const [loading, setLoading] = useState(false);

  // G E T    D A T A    F R O M    F O R M
  function login(e) {
    // D E E P    C O P Y
    const myUserLogin = userLogin;
    // U P D A T E
    myUserLogin[e.target.name] = e.target.value;
    // S E T    D A T A
    setUserLogin(myUserLogin);
  }

  // S U B M I T    F O R M    A C T I O N
  async function submitLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    const validationLogin = validdateLoginForm();
    if (validationLogin.error) {
      setErrorJoi(validationLogin.error.details);
      setLoading(false);
    } else {
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signin`,
        userLogin
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        props.saveUserData();
        navigate("/home");
        setLoading(false);
      } else {
        setErrorApi(data.message);
        setLoading(false);
      }
    }
  }

  // V A L I D A T I O N    J O I
  function validdateLoginForm() {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(userLogin, { abortEarly: false });
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      {/* S T A R T    L O G I N    A R E A */}
      <section className="login my-5">
        <div className="container">
          <h1 className="mb-4">Log In</h1>
          {errorApi ? <p className="alert alert-danger">{errorApi}</p> : ""}
          {errorJoi.map((error, index) => {
            return (
              <p key={index} className="alert alert-danger">
                {error.message}
              </p>
            );
          })}
          <form
            onSubmit={(e) => {
              submitLoginForm(e);
            }}
          >
            <label className="form-label mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => {
                login(e);
              }}
              className="form-control mb-4"
              type="email"
              name="email"
              id="email"
            />
            <label className="form-label mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => {
                login(e);
              }}
              className="form-control mb-4"
              type="password"
              name="password"
              id="password"
            />
            <button className="btn btn-info d-flex ms-auto" type="submit">
              {loading ? (
                <span>
                  <i className="fa-solid fa-spinner fa-spin"></i> Loading
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <p className=" text-center my-5">
            If You Don't Have Account Go To{" "}
            <Link to="/register" className=" text-decoration-none text-info">
              Register
            </Link>
          </p>
        </div>
      </section>
      {/* E N D    L O G I N    A R E A */}
    </>
  );
}
