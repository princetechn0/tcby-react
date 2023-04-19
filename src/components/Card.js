import { Card, Carousel } from "react-bootstrap/";
import "../styles/City.css";
import moment from "moment";

function CustomCard({ data }) {
  let {
    city,
    name,
    age_range,
    health_condition,
    living_condition,
    description,
    creation_time,
    latitude,
    longitude,
    images,
  } = data;

  console.log("images is", images);

  const getCardClass = () => {
    switch (health_condition) {
      case "Needs emergency help":
        return "danger";
      case "Sick":
        return "warning";
      default:
        return;
    }
  };
  return (
    <Card
      bg={`${getCardClass()}`}
      text={`${getCardClass() ? "white" : "black"}`}
      className="card"
    >
      {images && images.length > 1 && (
        <Carousel>
          {images.map((img) => (
            <Carousel.Item>
              <Card.Img variant="top" src={img} className="cardImg " />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {images && images.length === 1 && (
        <Card.Img variant="top" src={images} className="cardImg" />
      )}

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Living: {living_condition}</Card.Text>
        <Card.Text>Health: {health_condition}</Card.Text>
        <Card.Text>
          coordinates: {latitude} {longitude}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        Last Seen: {moment(creation_time).format("MM/DD/YY")}
      </Card.Footer>
    </Card>
  );
}

export default CustomCard;
