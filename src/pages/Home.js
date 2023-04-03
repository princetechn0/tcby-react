import { Container } from "react-bootstrap";
import "../styles/Home.css";
import { CustomModal } from "../components/Modal";
import CustomListGroup from "../components/ListGroup";

export const Home = ({ cities }) => {
  let filteredCities = [...new Set(cities)];
  console.log("ftilered", filteredCities);
  return (
    <Container>
      <h1 className="text-center m-5">This could be you...</h1>
      <CustomListGroup cities={filteredCities} />
      <CustomModal />
    </Container>
  );
};
