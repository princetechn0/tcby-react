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
        {source && (
          <svg
            width="19"
            height="19"
            fill="currentColor"
            className="bi bi-box-arrow-up-right"
            viewBox="0 0 16 16"
            style={{ position: "absolute", bottom: "15px", right: "15px" }}
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            />
          </svg>
        )}
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
      {source && (
        <svg
          width="19"
          height="19"
          fill="currentColor"
          className="bi bi-box-arrow-up-right"
          viewBox="0 0 16 16"
          style={{ position: "absolute", bottom: "15px", right: "15px" }}
        >
          <path
            fillRule="evenodd"
            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
          />
          <path
            fillRule="evenodd"
            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
          />
        </svg>
      )}
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
      <div className="about-title col-md-10 text-center">
        <h1 className="typewriter py-2">About...</h1>
      </div>
      <Container className="about-cards-container p-5 bg-light rounded-3">
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
