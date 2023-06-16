import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import "../styles/Home.css";
import { CustomModal } from "../components/Modal";
import CustomListGroup from "../components/ListGroup";
import { Maps } from "../components/Maps";
import lo from "lodash";
import { useState } from "react";

export const Home = ({
  cities,
  peopleLocations,
  onDataChange,
  isLoading,
  loggedInUser,
  generalGroupedCities,
}) => {
  const [tabKey, setTabKey] = useState("Cities");
  return (
    <>
      <Container className="text-center">
        <div className="title-container col-10">
          <h1 className="title-text typewriter py-2">This could be you...</h1>
        </div>
        {!isLoading ? (
          <>
            <Container className="about-cards-container py-5 mb-5 bg-light rounded-3 col-12 col-md-8">
              <CustomListGroup cities={cities} />
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

      <Container className="text-center mapsContainer p-5 mb-5 bg-light rounded-3">
        <h4 className="pb-5">
          {tabKey === "Individuals"
            ? "Homeless individuals near you"
            : "Cities with Homeless Populations"}
        </h4>
        {!isLoading && loggedInUser ? (
          <Tabs
            fill={true}
            defaultActiveKey="Cities"
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k)}
          >
            <Tab eventKey="Cities" title="Cities">
              <Maps locations={generalGroupedCities} />
            </Tab>
            <Tab eventKey="Individuals" title="Individuals">
              <Maps locations={peopleLocations} />
            </Tab>
          </Tabs>
        ) : (
          <Maps locations={generalGroupedCities} />
        )}
      </Container>
    </>
  );
};
