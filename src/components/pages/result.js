import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import FlexChart from './DonutChart';
import JobSatisfactionCard from './JobSatisfactionCard';

const Result = ({ applicant, company }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (applicant && company) {
      fetch(`http://127.0.0.1:8000/get_candidate_scores?candidate_name=${applicant}&company=${company}`)
        .then((response) => response.json())
        .then((data) => setResult(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [applicant, company]);

  return (
    <div>
      <Card style={{ margin: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <Card.Header style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center', fontSize: '1.5rem' }}>Job Satisfaction Dashboard</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={6}>
              {result && (
                <Card style={{ marginBottom: '20px' }} >
                  <Card.Header style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}  bg="primary" text="white">Applicant Details</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p><strong>Applicant:</strong> {result.Name}</p>
                      <p><strong>Company:</strong> {result.Company}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
              {result && (
                <JobSatisfactionCard result={result.Score} />
              )}
            </Col>
            <Col xs={12} md={6}>
              {result && (
                <FlexChart result={result.Score} />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Result;
