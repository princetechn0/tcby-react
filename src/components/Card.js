import { Card, Carousel, Button } from "react-bootstrap/";
import "../styles/City.css";
import moment from "moment";
import { isEmpty } from "lodash";

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

  const openInGoogleMaps = (latitude, longitude) => {
    return window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}+(${name}+Last Seen)`
    );
  };

  return (
    <Card
      bg={`${getCardClass()}`}
      text={`${getCardClass() ? "white" : "black"}`}
      className="card"
    >
      {images && images.length > 0 ? (
        images.length > 1 ? (
          <Carousel>
            {images.map((img) => (
              <Carousel.Item>
                <Card.Img variant="top" src={img} className="cardImg " />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Card.Img variant="top" src={images} className="cardImg" />
        )
      ) : null}

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Living Condition: {living_condition}</Card.Text>
        <Card.Text>Current Health: {health_condition}</Card.Text>
        {!isEmpty(latitude) && (
          <Button
            variant="primary "
            size="sm"
            onClick={() => openInGoogleMaps(latitude, longitude)}
          >
            View Last Location
          </Button>
        )}
      </Card.Body>
      <Card.Footer>
        Last Seen: {moment(creation_time).format("MM/DD/YY")}
      </Card.Footer>
    </Card>
  );
}

export default CustomCard;
