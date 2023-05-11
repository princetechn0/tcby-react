import { Container, Spinner } from "react-bootstrap";
import "../styles/Home.css";
import { CustomModal } from "../components/Modal";
import CustomListGroup from "../components/ListGroup";
import { Maps } from "../components/Maps";

export const Home = ({ cities, locations, onDataChange, isLoading }) => {
  let filteredCities = [...new Set(cities)];

  return (
    <>
      <Container className="text-center">
        <h1 className="m-5">This could be you...</h1>
        {!isLoading ? (
          <>
            <CustomListGroup cities={filteredCities} />
            <CustomModal onDataChange={onDataChange} />
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>

      <Container className="mapsContainer">
        <p className="text-center"> Unhoused individuals near you </p>
        <Maps locations={locations} />
      </Container>
    </>
  );
};
