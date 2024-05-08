// ApplicantForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ApplicantForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    jobTitle: '',
    company: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formSkills">
        <Form.Label>Skills</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formJobTitle">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter job title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formCurrentCompany">
        <Form.Label>Current Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Company name"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formCurrentPosition">
        <Form.Label>Current Position</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Position title"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ApplicantForm;
