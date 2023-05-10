import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import lo from "lodash";
import CustomCard from "../components/Card";
import { Masonry } from "masonic";
import { BACKEND_URL } from "../db";

export const City = () => {
  const [cityData, setCityData] = useState([]);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${BACKEND_URL}/cities/${cityName}`);
      if (data.ok) {
        const JSON_CONVERT = await data.json();
        console.log("city data", JSON_CONVERT);
        setCityData(JSON_CONVERT);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Container>
        {lo.isEmpty(cityData) ? (
          <h1 className="text-center my-5"> Nobody in this city.</h1>
        ) : (
          <>
            <h1 className="text-center my-5"> {cityName} </h1>
            <Masonry
              items={cityData}
              render={CustomCard}
              columnGutter={50}
              columnWidth={333}
              overscanBy={5}
            />
          </>
        )}
      </Container>
    </div>
  );
};
