import React, { Fragment, Suspense, useState } from 'react';
import Navbar from '../components/Dashboard/Navbar';
const Dashboard = () => {
  
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Fragment>
      <Navbar toggle={toggle} isOpen={isOpen} />
    </Fragment>
  );
};

export default Dashboard;