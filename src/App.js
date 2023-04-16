import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { City } from "./pages/City";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

function App() {
  const [cities, setCities] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    let data = await fetch(`http://localhost:3000/cities/`);
    let JSON_CONVERT = await data.json();
    console.log("converted json", JSON_CONVERT);
    setCities(JSON_CONVERT);

    data = await fetch(`http://localhost:3000/people/locations`);
    JSON_CONVERT = await data.json();
    console.log(" map points", JSON_CONVERT);
    setMapPoints(JSON_CONVERT);
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
