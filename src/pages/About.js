import { Container } from "react-bootstrap";
import "../styles/About.css";
import { Masonry } from "masonic";
import data from "../data/homelessData";

const JumboCard = ({ title, text, source }) => {
  const cardClasses = `p-5 bg-dark text-white rounded-3 hoverable`;

  return (
    <div className={cardClasses} onClick={() => window.open(source, "_blank")}>
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">{title}</h1>
        <p className="col-md-10 fs-4">{text}</p>
      </div>
    </div>
  );
};

const StandardCard = ({ title, text, source }) => {
  const cardClasses = `p-5 bg-light rounded-3 border border-dark hoverable`;

  return (
    <div className={cardClasses} onClick={() => window.open(source, "_blank")}>
      <h2 className="fw-bold">{title}</h2>
      <p className="col-md-10 fs-5">{text}</p>
    </div>
  );
};

const CustomCard = ({ data }) => {
  if (data.type === "jumbo") {
    return (
      <JumboCard
        key={data.header}
        title={data.header}
        text={data.info}
        source={data.source}
        buttonText={data.buttonText}
      />
    );
  }
  return (
    <StandardCard
      key={data.header}
      title={data.header}
      text={data.info}
      source={data.source}
      buttonText={data.buttonText}
    />
  );
};

export const About = () => {
  return (
    <Container className="my-5">
      <div className="about-container col-10">
        <h1 className="about-text">About</h1>
      </div>
      <Container className="p-5 bg-light rounded-3">
        <Masonry
          items={data}
          render={CustomCard}
          columnGutter={60}
          columnWidth={400}
        />
      </Container>
    </Container>
  );
};
