import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import lo from "lodash";
import CustomCard from "../components/Card";
import { Masonry } from "masonic";

export const City = () => {
  const [cities, setCities] = useState([]);
  const { cityName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3000/cities/${cityName}`);
      if (data.ok) {
        const JSON_CONVERT = await data.json();
        setCities(JSON_CONVERT);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <Container>
        {lo.isEmpty(cities) ? (
          <h2 className="text-center mt-3"> Nobody in this city.</h2>
        ) : (
          <>
            <h1 className="text-center my-5"> {cityName} </h1>
            <Masonry
              items={cities}
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
