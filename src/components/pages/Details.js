// Details.js
import React from 'react';
import { Button } from 'react-bootstrap';


const Details = ({ formData, onNextClick}) => {
    const handleNextClick = () => {
        onNextClick(); // Call the function provided by the parent component
      };
  return (
    <div>
      <p>Name: {formData.name}</p>
      <p>Skills: {formData.skills}</p>
      <p>Job Title: {formData.jobTitle}</p>
      <p>Current Company: {formData.company}</p>
      <p>Current Position: {formData.position}</p>
      <p>Desired Job Type: {formData.jobType}</p>
      <p>New Job Title: {formData.newJobTitle}</p>
      
      <Button variant="primary" onClick={handleNextClick}>
              Next
       </Button>
    </div>
  );
};

export default Details;
