import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import lo from "lodash";
import CustomCard from "../components/Card.tsx";
import { Masonry } from "masonic";
import { BACKEND_URL } from "../db";
import "../styles/City.css";
import { LoggedInContext } from "../context/LoggedInContext";

export const City = ({ loggedInUser }) => {
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch(`${BACKEND_URL}/cities/${cityName}`);
      if (data.ok) {
        const JSON_CONVERT = await data.json();
        console.log("city data", JSON_CONVERT);
        setCityData(JSON_CONVERT);
        setIsLoading(false);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <LoggedInContext.Provider value={loggedInUser}>
      <Container>
        {lo.isEmpty(cityData) && !isLoading ? (
          <h1 className="text-center my-5"> Nobody in this city.</h1>
        ) : (
          <>
            <div className="title-container col-10">
              <h1 className="title-text">{cityName}</h1>
            </div>
            <Container className="about-cards-container p-5 bg-light rounded-3">
              <Masonry
                items={cityData}
                render={CustomCard}
                columnGutter={50}
                columnWidth={350}
                overscanBy={5}
              />

              {isLoading && (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </Container>
          </>
        )}
      </Container>
    </LoggedInContext.Provider>
  );
};
