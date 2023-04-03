import { Card } from "react-bootstrap/";
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
  } = data;

  return (
    <Card className="card">
      <Card.Img variant="top" src={require("../static/images/person.jpg")} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{city}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{living_condition}</Card.Text>
        <Card.Text>
          Last Seen: {moment(creation_time).format("MM/DD/YY")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
