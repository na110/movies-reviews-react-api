import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  // U S E R    I N F O R M A T I O N
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  // E R R O R    V A L I D A T I O N    A P I    
  const [errorApi, setErrorApi] = useState('');

  // E R R O R    V A L I D A T I O N    J O I  
  const [errorJoi, setErrorJoi] = useState([]);

  // L O A D I N G    C O N D I T I O N
  const [loading, setLoading] = useState(false);

  // G E T    U S E R    I N F O R M A T I O N
  function addUser(e) {
    // D E E P    C O P Y
    let myUser = { ...user };
    // U P D A T E
    myUser[e.target.name] = e.target.value;
    // S E T    D A T A
    setUser(myUser);
  }

  // S E N D    U S E R    I N F O R A M T I O N    T O    B A C K    E N D
  async function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true)
    let validationRegister = validateRegisterForm()
    if (validationRegister.error) {
      setErrorJoi(validationRegister.error.details);
      setLoading(false);
    } else {
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signup`,
        user
      );
      if (data.message === "success") {
        navigate("/login")
        setLoading(false)

      } else {
        setErrorApi(data.message)
        setLoading(false)

      }
    }

  }

  // V A L I D A T I O N    I N P U T
  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    return schema.validate(user, { abortEarly: false });

  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/home")
    }
  }, [])

  return (
    <>
      {/* S T A R T    R E G I S T E R    A R E A */}
      <section>
        <div className="container my-5">
          <h1 className="mb-4">Register</h1>
          {errorApi ? <p className="alert alert-danger">{errorApi}</p> : ""}
          {errorJoi.map((error, index) => { return errorJoi ? <p key={index} className="alert alert-danger">{error.message}</p> : "" })}
          <form
            onSubmit={(e) => {
              submitRegisterForm(e)
            }}
          >
            <label htmlFor="firstName" className="form-label mb-2">
              First Name:
            </label>
            <input
              className="form-control mb-4"
              type="text"
              name="first_name"
              id="firstName"
              onChange={(e) => {
                addUser(e);
              }}
            />
            <label htmlFor="lastName" className="form-label mb-2">
              Last Name:
            </label>
            <input
              className="form-control mb-4"
              type="text"
              name="last_name"
              id="lastName"
              onChange={(e) => {
                addUser(e);
              }}
            />
            <label htmlFor="age" className="form-label mb-2">
              Age
            </label>
            <input
              className="form-control mb-4"
              type="number"
              name="age"
              id="age"
              onChange={(e) => {
                addUser(e);
              }}
            />
            <label htmlFor="email" className="form-label mb-2">
              Email
            </label>
            <input
              className="form-control mb-4"
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                addUser(e);
              }}
            />
            <label htmlFor="password" className="form-label mb-2">
              Password
            </label>
            <input
              className="form-control mb-4"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                addUser(e);
              }}
            />

            <button className="btn btn-info d-flex ms-auto mb-5" type="submit">
              {loading ? <span><i className="fa-solid fa-spinner fa-spin"></i> Loading</span> : "Register"}
            </button>
          </form>
          <p className=" text-center my-5">If You Have Account Go To <Link to="/login" className=" text-decoration-none text-info">Login</Link></p>
        </div>
      </section>
      {/* E N D    R E G I S T E R    A R E A */}
    </>
  );
}
