import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ApplicantForm from './components/ApplicantForm';
import Details from './components/pages/Details';
import TableauEmbed from './components/pages/TableauEmbed';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState('form'); // Initial page is the form

  const handleFormSubmit = (formData) => {
    setFormData(formData);
    setCurrentPage('details'); // Navigate to details page after form submission
  };

  const handleNextClick = () => {
    setCurrentPage('tableau'); // Navigate to Tableau visualization page
  };

  return (
    <Container>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Predict Job Satisfaction</Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      <h1>Applicant Details</h1>
      {currentPage === 'form' && <ApplicantForm onSubmit={handleFormSubmit} />}
      {currentPage === 'details' && <Details formData={formData} onNextClick={handleNextClick} />}
      {currentPage === 'tableau' && <TableauEmbed />}
    </Container>
  );
};

export default App;
