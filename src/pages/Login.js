import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const isFormEmpty = formData.email === "" || formData.password === "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("submit login");
      //   await postData(formData);
    }

    setValidated(true);
  };

  return (
    <Container className="text-center">
      <h1 className="m-5">Log In</h1>

      <div className="col-8 col-md-6 mx-auto">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />

            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />

            <Form.Control.Feedback type="invalid">
              Please enter your password
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="w-50"
            type="submit"
            variant="primary"
            disabled={isFormEmpty}
          >
            Log In
          </Button>
        </Form>
      </div>
    </Container>
  );
};
