import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { auth } from "../UserAuthentication/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import ToastNotification from "../components/ToastNotification";

export const Login = ({ loggedInUser, setLoggedInUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValidated, setFormValidated] = useState(false);
  const isFormEmpty = formData.email === "" || formData.password === "";

  // Toast Message Functions
  const [showToast, setShowtoast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await setPersistence(auth, browserLocalPersistence);
        setLoggedInUser(formData.email);
        setToastMessage(`Login successful as ${formData.email}`);
      } catch (err) {
        await signOut(auth);
        setLoggedInUser();
        setToastMessage(`Login failed. Please try again.`);
      }
      setShowtoast(true);
    }

    setFormValidated(true);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await signOut(auth);
    setLoggedInUser();
  };

  return (
    <Container className="text-center">
      <ToastNotification
        onClose={() => setShowtoast(false)}
        showToast={showToast}
        message={toastMessage}
      />

      {/* User Logged In */}
      {loggedInUser && (
        <>
          <h1 className="m-5">Log Out</h1>
          <Button
            className="w-25 p-2 mt-4"
            variant="danger"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </>
      )}

      {/* User Not Logged In */}
      {!loggedInUser && (
        <>
          <h1 className="m-5">Log In</h1>
          <div className="col-8 col-md-6 mx-auto">
            <Form noValidate validated={formValidated} onSubmit={handleLogin}>
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
                className="w-50 p-2 mt-4"
                type="submit"
                variant="primary"
                disabled={isFormEmpty}
              >
                Log In
              </Button>
            </Form>
          </div>

          <h5 className="m-5">
            To request an account, please{" "}
            <a href="mailto:aliataya8917@gmail.com?subject=Account%20Creation%20Request:%20This%20Could%20be%20You">
              email
            </a>
            .
          </h5>
        </>
      )}
    </Container>
  );
};
