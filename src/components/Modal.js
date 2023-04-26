import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";

const postData = async (formData) => {
  // console.log(formData);
  let newForm = new FormData();
  for (let prop in formData) {
    if (prop !== "images") {
      newForm.append(prop, formData[prop]);
    }
  }
  for (let i = 0; i < formData.images.length; i++) {
    newForm.append("images", formData.images[i]);
  }
  console.log("final", newForm);
  const requestOptions = {
    method: "POST",
    body: newForm,
  };
  fetch(`http://localhost:3000/people/`, requestOptions);
};

function CustomForm({ handleClose, handleDataChange }) {
  const [formData, setFormData] = useState({
    city: "",
    name: "",
    age_range: "18-34",
    health_condition: "Average",
    living_condition: "Average",
    description: "",
    latitude: "",
    longitude: "",
    images: "",
  });

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      postData(formData);
      handleDataChange();
      handleClose();
    }

    setValidated(true);
  };

  const geosearch = () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      const { latitude, longitude } = res.coords;
      let value = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCQDYdr85yoCsnz8YWUq4GUL-5nQXBQGG4`
      );
      let data = await value.json();
      console.log(data);
      data = data["results"].filter((e) => e.types.includes("locality"));
      data = data[0]["address_components"].filter((e) =>
        e.types.includes("locality")
      );
      console.log(data[0].long_name, latitude, longitude);

      setFormData({
        ...formData,
        city: data[0].long_name,
        latitude: latitude,
        longitude: longitude,
      });
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="validationCustom01">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={`Enter city`}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          value={formData.city}
        />
        <div>
          <Button className="ms-auto" variant="link" onClick={geosearch}>
            Locate Me
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          Please enter a location
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationCustom02">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={`What's their name?`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAgeRange">
        <Form.Label>Age Range</Form.Label>
        <Form.Select
          value={formData.age_range}
          onChange={(e) =>
            setFormData({ ...formData, age_range: e.target.value })
          }
        >
          <option>Under 18</option>
          <option>18-34</option>
          <option>35-51</option>
          <option>52-65</option>
          <option>65+</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicHealthCondition">
        <Form.Label>Health Condition</Form.Label>
        <Form.Select
          value={formData.health_condition}
          onChange={(e) =>
            setFormData({ ...formData, health_condition: e.target.value })
          }
        >
          <option>Needs emergency help</option>
          <option>Sick</option>
          <option>Average</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLivingCondition">
        <Form.Label>Living Condition</Form.Label>
        <Form.Select
          value={formData.living_condition}
          onChange={(e) =>
            setFormData({ ...formData, living_condition: e.target.value })
          }
        >
          <option>Needs emergency help</option>
          <option>Severe</option>
          <option>Poor</option>
          <option>Average</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder={"Describe the situation"}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload a picture </Form.Label>
        <Form.Control
          as="input"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            console.log(e.target.files, e.target.value);
            setFormData({ ...formData, images: [...e.target.files] });
          }}
        />
      </Form.Group>

      <Stack direction="horizontal" gap={3}>
        <Button className="ms-auto" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Stack>
    </Form>
  );
}

export const CustomModal = ({ onDataChange }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex justify-content-center">
      <Button variant="outline-dark " size="small" onClick={handleShow}>
        Add a Person
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm
            handleClose={handleClose}
            handleDataChange={onDataChange}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
