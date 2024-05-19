import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const JobSatisfactionCard = ({ result }) => {
  return (
    <Card style={{ margin: 'auto', marginTop: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} bg="primary" text="white">
      <Card.Header style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>Job Satisfaction Score</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item style={{ backgroundColor: '#f8f9fa' }}><strong>Overall:</strong> {result.OverallMatch} %</ListGroup.Item>
        <ListGroup.Item style={{ backgroundColor: '#f8f9fa' }}><strong>Skills:</strong> {result.SkillsMatch} %</ListGroup.Item>
        <ListGroup.Item style={{ backgroundColor: '#f8f9fa' }}><strong>Compensation:</strong> {result.CompensationScore} %</ListGroup.Item>
        <ListGroup.Item style={{ backgroundColor: '#f8f9fa' }}><strong>Culture:</strong> {result.CultureScore} %</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default JobSatisfactionCard;
