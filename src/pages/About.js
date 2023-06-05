import { Container } from "react-bootstrap";
import "../styles/About.css";

const facts = [
  {
    info: "In January 2020 , there were 580,466 people experiencing homelessness on our streets",
    source:
      "https://endhomelessness.org/homelessness-in-america/homelessness-statistics/state-of-homelessness/#key-facts",
  },
  {
    info: "28% were people living in families with children",
    source:
      "https://endhomelessness.org/homelessness-in-america/homelessness-statistics/state-of-homelessness/",
  },
  { info: "7,877 deaths in 2020", source: "https://homelessdeathscount.org" },
];

export const About = () => {
  return (
    <Container>
      <div className="about-container col-10">
        <h1 className="about-text">About</h1>
      </div>
      {facts.map((elem) => (
        <a
          className="about-a"
          href={elem.source}
          target="_blank"
          key={elem.info}
          rel="noreferrer"
        >
          {elem.info}
        </a>
      ))}
    </Container>
  );
};
