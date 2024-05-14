//ApplicantData.jsx
import React, { useState } from 'react';
import { Form, button } from 'react-bootstrap'; 
import Details from '../pages/Details';
import {Link} from 'react-router-dom';

function ApplicantName() {
    var input = document.createElement("input");

    input.type = "text"

    input.placeholder = "Please enter your name"

    return input;
}

ApplicantName()

function ApplicantData(onEdit, input, onDelete, Details) {

    const [name, setName] = useState(input ? input.name : '');

    const [isRetrieved, setIsRetrieved] = useState(false)

    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleRetrieve = () => {
        // Implement logic to retrieve saved information based on the entered name
        // For example, you can make an API call here to fetch data from a backend server
        // Once data is retrieved, update the data state and set isRetrieved to true
        const retrievedData = { // Sample retrieved data
            name: name,
            skills: 'Sample Skills',
            jobTitle: 'Sample Job Title',
            company: 'Sample Company',
            position: 'Sample Position'
        };
        onEdit(retrievedData);
        setIsRetrieved(true);
    };
if (!input) {
        return <div>No data to display</div>;
    }
    else{
        const handleEdit = () => {
            const newInput = {...input, name: name}
            // Call the onEdit function with the applicant data
            onEdit(newInput);
        };

        const handleDelete = () => {
            // Call the onDelete function with the applicant data
            onDelete(input);
        };

        return (
            <div>
                <h2>Edit Data</h2>
                <p>Name: 
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeHolder="Enter you name"
                    />
                </p>
                {isRetrieved && input.name && (
                    <>
                        <p>Skills: {input.skills}</p>
                        <p>Job Title: {input.jobTitle}</p>
                        <p>Current Company: {input.company}</p>
                        <p>Current Position: {input.position}</p>
                    </>
                ) }

                <button type="button" className="btn btn-primary" onClick={handleRetrieve}>
                    Search
                </button>
                <button type="button" className="btn btn-success" onClick={handleEdit}>
                    Edit
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>


            </div>

        );

    }


}

export default ApplicantData;