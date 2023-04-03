import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { City } from "./pages/City";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3000/cities/`);
      const JSON_CONVERT = await data.json();
      console.log("converted json", JSON_CONVERT);
      setCities(JSON_CONVERT);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home cities={cities} />} />
            {/* <Route path="city" element={<City />} /> */}
            <Route path="city/:cityName" element={<City />} />
            <Route path="*" element={<Home cities={cities} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
