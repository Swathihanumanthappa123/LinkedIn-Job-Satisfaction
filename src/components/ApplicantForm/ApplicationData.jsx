//ApplicantData.js

import React from 'react';

function ApplicantData({ data, onEdit, onDelete }) {
   if (!data) {
       return <div>No data to display</div>;
   }

   const handleEdit = () => {
       // Call the onEdit function with the applicant data
       onEdit(data);
   };

   const handleDelete = () => {
       // Call the onDelete function with the applicant data
       onDelete(data);
   };

   return (
       <div>
           <h2>Applicant Information</h2>
           <p>Name: {data.name}</p>
           {data.name && (
               <>
                   <p>Skills: {data.skills}</p>
                   <p>Job Title: {data.jobTitle}</p>
                   <p>Current Company: {data.company}</p>
                   <p>Current Position: {data.position}</p>
               </>
           ) }

           <button type="button" className="btn btn-success" onClick={handleEdit}>
               Edit
           </button>
           <button type="button" className="btn btn-danger" onClick={handleDelete}>
               Delete
           </button>
       </div>
   );
}

export default ApplicantData;