import React from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <button 
          className="navbar-brand btn btn-link text-decoration-none fw-bold fs-4 text-dark"
          onClick={() => setActiveSection('dashboard')}
        >
          💰 FinanceTracker
        </button>
        <div className="navbar-nav ms-auto d-flex flex-row gap-3">
          <button 
            className={`nav-link btn btn-link text-decoration-none ${activeSection === 'dashboard' ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-link btn btn-link text-decoration-none ${activeSection === 'bills' ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setActiveSection('bills')}
          >
            Bills
          </button>
          <button 
            className={`nav-link btn btn-link text-decoration-none ${activeSection === 'budget' ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setActiveSection('budget')}
          >
            Budget
          </button>
          <button 
            className={`nav-link btn btn-link text-decoration-none ${activeSection === 'notifications' ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setActiveSection('notifications')}
          >
            Notifications
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;