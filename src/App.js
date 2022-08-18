import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import TvShow from "./Components/TvShow/TvShow";
import People from "./Components/People/People";
import About from "./Components/About/About";
import LogIn from "./Components/LogIn/LogIn";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TvDetails from "./Components/TvDetails/TvDetails";
import PeopleDetails from "./Components/PeopleDetails/PeopleDetails";
export default function App() {
  const navigate = useNavigate();

  // U S E R    D A T A
  const [userData, setUserData] = useState(null);
  let userName;
  if (userData !== null) {
    userName = userData.first_name;
  }

  // S A V E    U S E R    D A T A    I N    L O C A L    S T O R A G E
  function saveUserData() {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    // C H E C K    I F    U S E R    H A V E    D A T A    I N    L O C AL    S T O R A G E

    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  // L O G     O U T    H A N D L E
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  // P R O T E C T D    R O U T E
  function ProtectedRoute(props) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  return (
    <>
      <Navbar userData={userData} logOut={logOut} userName={userName} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="movie-details/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="tvshow"
          element={
            <ProtectedRoute>
              <TvShow />
            </ProtectedRoute>
          }
        />
        <Route
          path="tv-details/:id"
          element={
            <ProtectedRoute>
              <TvDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="people"
          element={
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          }
        />
        <Route
          path="people-details/:id"
          element={
            <ProtectedRoute>
              <PeopleDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<LogIn saveUserData={saveUserData} />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
