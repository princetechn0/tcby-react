import { Container } from "react-bootstrap";

export const About = () => {
  return (
    <Container className="text-center">
      <h1 className="m-5 ">Homelessness</h1>
      <ul style={{ listStyle: "none", fontSize: 24, lineHeight: 5 }}>
        <p>
          In January 2020 , there were 580,466 people experiencing homelessness
          on our streets{" "}
        </p>
        <p>7,877 deaths in 2020</p>
      </ul>
    </Container>
  );
};
