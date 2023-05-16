import { Container } from "react-bootstrap";

const facts = [
  " In January 2020 , there were 580,466 people experiencing homelessness on our streets",
  "7,877 deaths in 2020",
];

export const About = () => {
  return (
    <Container className="text-center">
      <h1 className="m-5">Homelessness</h1>
      <ul style={{ listStyle: "none", fontSize: 24, lineHeight: 2 }}>
        {facts.map((fact, index) => (
          <li key={index} style={{ borderBottom: "3px solid black" }}>
            {fact}
          </li>
        ))}
      </ul>
    </Container>
  );
};
