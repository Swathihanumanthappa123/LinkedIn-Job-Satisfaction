// Details.js
import React from 'react';
import { Button } from 'react-bootstrap';

const Details = ({ formData, onNextClick}) => {
    const handleNextClick = () => {
        onNextClick(); // Call the function provided by the parent component
      };
  return (
    <div>
      <h2>Applicant Details</h2>
      <p>Name: {formData.name}</p>
      <p>Skills: {formData.skills}</p>
      <p>Job Title: {formData.jobTitle}</p>
      <p>Current Company: {formData.company}</p>
      <p>Current Position: {formData.position}</p>
      <p>Desired Job Title: {formData.desiredJobTitle}</p>
      <p>Preferred Location: {formData.location}</p>
      <p>Desired Salary Range: {formData.desiredSalaryRange}</p>
      <p>Desired Job Level: {formData.desiredJobLevel}</p>
      <p>Desired Job Type: {formData.desiredJobType}</p>
      <p>Desired Location Type: {formData.desiredLocationType}</p>
      <p>Work Life Balance: {formData.WorkLifeBalance}</p>
      <p>Compensation and Benefits: {formData.CompBenefits}</p>
      <p>Career Opportunities: {formData.CareerGrowth}</p>
      
      <Button variant="primary" onClick={handleNextClick}>
              Next
       </Button>
    </div>
  );
};

export default Details;
