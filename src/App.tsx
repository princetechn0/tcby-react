import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./UserAuthentication/firebase";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { City } from "./pages/City";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { BACKEND_URL } from "./db";
import { Login } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [cities, setCities] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [generalGroupedCities, setGeneralGroupedCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.email);
      } else {
        console.log("No Active User Set");
      }
    });
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    let data = await fetch(BACKEND_URL + `/cities/`);
    let JSON_CONVERT = await data.json();
    console.log("List of Cities", JSON_CONVERT);
    setCities(JSON_CONVERT);

    data = await fetch(BACKEND_URL + `/people/locations`);
    JSON_CONVERT = await data.json();
    console.log("List of Map Locations of People", JSON_CONVERT);
    setMapPoints(JSON_CONVERT);

    setIsLoading(false);

    data = await fetch(BACKEND_URL + `/cities/groupedLocations`);
    JSON_CONVERT = await data.json();
    console.log("General Cities", JSON_CONVERT);
    setGeneralGroupedCities(JSON_CONVERT);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout loggedInUser={loggedInUser} />}>
            <Route
              index
              element={
                <Home
                  cities={cities}
                  peopleLocations={mapPoints}
                  generalGroupedCities={generalGroupedCities}
                  onDataChange={() => fetchData()}
                  isLoading={isLoading}
                  loggedInUser={loggedInUser}
                />
              }
            />
            {/* <Route path="city" element={<City />} /> */}
            <Route
              path="city/:cityName"
              element={<City loggedInUser={loggedInUser} />}
            />
            <Route path="about" element={<About />} />
            <Route
              path="login"
              element={
                <Login
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />

            <Route
              path="*"
              element={
                <Home
                  cities={cities}
                  peopleLocations={mapPoints}
                  generalGroupedCities={generalGroupedCities}
                  onDataChange={() => fetchData()}
                  isLoading={isLoading}
                  loggedInUser={loggedInUser}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
