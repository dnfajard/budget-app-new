import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Bills from './components/Bills';
import Budget from './components/Budget';
import Notifications from './components/Notifications';
import { mockData } from './data/mockData';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [bills, setBills] = useState(mockData.bills);
  const [budget] = useState(mockData.budget);
  const [notifications] = useState(mockData.notifications);
  const [alternatives] = useState(mockData.alternatives);

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard bills={bills} budget={budget} />;
      case 'bills':
        return <Bills bills={bills} setBills={setBills} alternatives={alternatives} />;
      case 'budget':
        return <Budget budget={budget} bills={bills} />;
      case 'notifications':
        return <Notifications notifications={notifications} />;
      default:
        return <Dashboard bills={bills} budget={budget} />;
    }
  };

  return (
    <div className="App">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default App;