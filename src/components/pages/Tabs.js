import Nav from 'react-bootstrap/Nav';
import React from 'react';

const Tabs = ({ onDashboardClick }) => {
  const handleDashboardClick = () => {
    if (onDashboardClick) {
      onDashboardClick(); // Call the function provided by the parent component to change the current page to 'tableau'
    }
  };

  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link onClick={handleDashboardClick}>Company Dashboard</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Tabs;
