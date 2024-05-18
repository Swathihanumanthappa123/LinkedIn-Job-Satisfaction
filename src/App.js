import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ApplicantForm from './components/ApplicantForm/ApplicantForm';
import ApplicantData from './components/ApplicantData/ApplicantData';
import Details from './components/pages/Details';
import TableauEmbed from './components/pages/TableauEmbed';
import Tabs from './components/pages/Tabs';
import results from './components/pages/result';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState('form'); // Initial page is the form

  const handleFormSubmit = (formData) => {
    setFormData(formData);
    setCurrentPage('details'); // Navigate to details page after form submission
  };

  const handleNextClick = () => {
    setCurrentPage('result'); // Navigate to details page
  };

  const handleApplicantDataClick = () => {
    setCurrentPage('applicantData'); // Navigate to Applicant Data page
  };

  const handleDashboardClick = () => {
    setCurrentPage('tableau'); // Navigate to Tableau visualization page
  };

  const handleBackClick = () => {
    setCurrentPage('result'); // Navigate back to result page
  };

  const handleConfirm = (applicant, company) => {
    console.log(`Applicant: ${applicant}, Company: ${company}`);
    setCurrentPage('result'); // Navigate to Tabs page after confirmation
  };

  const handleHomeClick = () => {
    setCurrentPage('form'); // Navigate back to form page (home)
  };

  return (
    <Container>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            <h1>Predict Job Satisfaction</h1>
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
      {currentPage === 'form' && <ApplicantForm onSubmit={handleFormSubmit} onConfirm={handleConfirm} />}
      {currentPage === 'details' && <Details formData={formData} onNextClick={handleNextClick} />}
      {currentPage === 'result' && <Tabs onDashboardClick={handleDashboardClick} />}
      {currentPage === 'tableau' && <TableauEmbed onBackClick={handleBackClick} />}
      {currentPage === 'applicantData' && <ApplicantData />}
    </Container>
  );
};

export default App;
