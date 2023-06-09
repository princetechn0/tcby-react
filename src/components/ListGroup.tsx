import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "../styles/ListGroup.css";
import { Badge } from "react-bootstrap";
import React from "react";
import { ICity } from "../types";

type CustomListGroupProps = {
  cities: ICity[];
};

function CustomListGroup({ cities }: CustomListGroupProps) {
  return (
    <div className="CustomListGroup">
      <ListGroup>
        {cities.map((city) => (
          <ListGroup.Item
            className="col-10 col-lg-8 mx-auto d-flex justify-content-between align-items-center"
            key={city.city}
            as={Link}
            to={"city/" + city.city}
          >
            <span
              style={{ fontSize: "1.3rem" }}
              className="flex-grow-1 text-center"
            >
              {city.city}
            </span>
            <Badge className="ml-auto" bg="primary" pill>
              {city.count}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default CustomListGroup;
