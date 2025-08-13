import React from 'react';
import StatCard from './StatCard';

const Dashboard = ({ bills, budget }) => {
  const totalExpenses = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remaining = budget.monthly_limit - totalExpenses;
  const budgetPercentage = Math.round((remaining / budget.monthly_limit) * 100);
  const dueSoonBills = bills.filter(bill => bill.status === 'due_soon').length;
  const potentialSavings = 40;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-light">Dashboard</h1>
      
      <div className="row mb-5">
        <StatCard 
          icon="fas fa-dollar-sign" 
          title="Monthly Expenses" 
          value={`$${totalExpenses.toLocaleString()}`}
          subtitle="3 bills pending"
          color="primary"
        />
        <StatCard 
          icon="fas fa-piggy-bank" 
          title="Remaining Budget" 
          value={`$${remaining.toLocaleString()}`}
          subtitle={`${budgetPercentage}% left`}
          color="success"
        />
        <StatCard 
          icon="fas fa-clock" 
          title="Due Soon" 
          value={dueSoonBills}
          subtitle="Next 7 days"
          color="warning"
        />
        <StatCard 
          icon="fas fa-lightbulb" 
          title="Potential Savings" 
          value={`$${potentialSavings}`}
          subtitle="2 alternatives"
          color="danger"
        />
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recent Bills</h5>
                <button className="btn btn-primary">View All</button>
              </div>
              
              {bills.map(bill => (
                <div key={bill.bill_id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <div className={`me-3 rounded-circle d-flex align-items-center justify-content-center`} 
                         style={{width: '40px', height: '40px', backgroundColor: bill.isExpensive ? '#ffebee' : bill.status === 'due_soon' ? '#fff8e1' : '#e0f2f1'}}>
                      <i className={`fas ${bill.category === 'Housing' ? 'fa-home' : bill.category === 'Utilities' ? 'fa-bolt' : 'fa-wifi'} ${bill.isExpensive ? 'text-danger' : bill.status === 'due_soon' ? 'text-warning' : 'text-info'}`}></i>
                    </div>
                    <div>
                      <h6 className="mb-1">{bill.name}</h6>
                      <small className="text-muted">{bill.category} • Due {new Date(bill.due_date).toLocaleDateString()}</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <strong>${bill.amount.toFixed(2)}</strong>
                    <br />
                    <span className={`badge ${bill.isExpensive ? 'bg-danger' : bill.status === 'due_soon' ? 'bg-warning text-dark' : 'bg-success'}`}>
                      {bill.isExpensive ? 'Expensive' : bill.status === 'due_soon' ? 'Due Soon' : 'Paid'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <h5 className="mb-3">Budget Progress</h5>
              <div className="position-relative d-inline-block mb-3">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f3f4" strokeWidth="8"/>
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#28a745" 
                    strokeWidth="8"
                    strokeDasharray={`${budgetPercentage * 3.14} 314`}
                    strokeDashoffset="78.5"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="fs-4 fw-bold">{budgetPercentage}%</div>
                </div>
              </div>
              <p className="mb-2"><strong>${remaining.toLocaleString()}</strong> remaining</p>
              <small className="text-muted">of ${budget.monthly_limit.toLocaleString()} monthly budget</small>
              <div className="alert alert-success mt-3" role="alert">
                ✅ You're on track this month!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;