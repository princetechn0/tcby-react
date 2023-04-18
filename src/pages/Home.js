import { Container } from "react-bootstrap";
import "../styles/Home.css";
import { CustomModal } from "../components/Modal";
import CustomListGroup from "../components/ListGroup";
import { Maps } from "../components/Maps";

export const Home = ({ cities, locations, onDataChange }) => {
  let filteredCities = [...new Set(cities)];

  return (
    <>
      <Container>
        <h1 className="text-center m-5">This could be you...</h1>
        <CustomListGroup cities={filteredCities} />
        <CustomModal onDataChange={onDataChange} />
      </Container>

      <Container className="mapsContainer">
        <p className="text-center"> Unhoused individuals near you </p>
        <Maps locations={locations} />
      </Container>
    </>
  );
};
