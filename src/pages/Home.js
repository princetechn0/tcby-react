import { Card, Container, Spinner } from "react-bootstrap";
import "../styles/Home.css";
import { CustomModal } from "../components/Modal";
import CustomListGroup from "../components/ListGroup";
import { Maps } from "../components/Maps";
import lo from "lodash";

export const Home = ({
  cities,
  locations,
  onDataChange,
  isLoading,
  loggedInUser,
}) => {
  let filteredCities = [...new Set(cities)];

  return (
    <>
      <Container className="text-center">
        <div className="title-container col-10">
          <h1 className="title-text">This could be you...</h1>
        </div>
        {!isLoading ? (
          <>
            <Container className="about-cards-container py-5 mb-5 bg-light rounded-3 col-12 col-md-8">
              <CustomListGroup cities={filteredCities} />
              {!lo.isEmpty(loggedInUser) && (
                <CustomModal onDataChange={onDataChange} />
              )}
            </Container>
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>

      <Container className="text-center mapsContainer">
        <Card>
          <Card.Header className="py-3">
            {loggedInUser
              ? "Unhoused individuals near you"
              : "Please log in to see unhoused individuals near you"}
          </Card.Header>
          <Maps locations={locations} loggedInUser={loggedInUser} />
        </Card>
      </Container>
    </>
  );
};
