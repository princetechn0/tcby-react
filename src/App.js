import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { City } from "./pages/City";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { BACKEND_URL } from "./db";

function App() {
  const [cities, setCities] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData().catch(console.error);
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
          <Route path="/" element={<Layout />}>
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
