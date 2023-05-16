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

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [cities, setCities] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.email);
      } else {
        console.log("No Active User Set");
      }
    });
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    let data = await fetch(BACKEND_URL + `/cities/`);
    let JSON_CONVERT = await data.json();
    console.log("converted json", JSON_CONVERT);
    setCities(JSON_CONVERT);

    data = await fetch(BACKEND_URL + `/people/locations`);
    JSON_CONVERT = await data.json();
    console.log(" map points", JSON_CONVERT);
    setMapPoints(JSON_CONVERT);
    setIsLoading(false);
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
                  locations={mapPoints}
                  onDataChange={() => fetchData()}
                  isLoading={isLoading}
                />
              }
            />
            {/* <Route path="city" element={<City />} /> */}
            <Route path="city/:cityName" element={<City />} />
            <Route path="about" element={<About />} />
            <Route
              path="login"
              element={<Login setLoggedInUser={setLoggedInUser} />}
            />

            <Route
              path="*"
              element={
                <Home
                  cities={cities}
                  locations={mapPoints}
                  onDataChange={() => fetchData()}
                  isLoading={isLoading}
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
