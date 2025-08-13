import React, { useState } from 'react';

const Bills = ({ bills, setBills, alternatives }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    category: 'Utilities',
    due_date: ''
  });

  const handleAddBill = (e) => {
    e.preventDefault();
    const bill = {
      bill_id: Math.max(...bills.map(b => b.bill_id)) + 1,
      user_id: 1,
      ...newBill,
      amount: parseFloat(newBill.amount),
      isExpensive: parseFloat(newBill.amount) > 500,
      status: 'pending'
    };
    setBills([...bills, bill]);
    setNewBill({ name: '', amount: '', category: 'Utilities', due_date: '' });
    setShowAddForm(false);
  };

  const getBadgeClass = (bill) => {
    if (bill.isExpensive) return 'bg-danger';
    if (bill.status === 'due_soon') return 'bg-warning text-dark';
    if (bill.status === 'paid') return 'bg-success';
    return 'bg-secondary';
  };

  const getBadgeText = (bill) => {
    if (bill.isExpensive) return 'Expensive';
    if (bill.status === 'due_soon') return 'Due Soon';
    if (bill.status === 'paid') return 'Paid';
    return 'Pending';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-light">Bills Management</h1>
      
      <div className="row">
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Your Bills</h5>
                <div>
                  <button 
                    className="btn btn-primary me-2"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    ➕ Add Bill
                  </button>
                  <button className="btn btn-outline-secondary">
                    🔍 Filter
                  </button>
                </div>
              </div>
              
              {showAddForm && (
                <div className="card bg-light mb-4">
                  <div className="card-body">
                    <h6>Add New Bill</h6>
                    <form onSubmit={handleAddBill}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bill Name"
                            value={newBill.name}
                            onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            value={newBill.amount}
                            onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <select
                            className="form-select"
                            value={newBill.category}
                            onChange={(e) => setNewBill({...newBill, category: e.target.value})}
                          >
                            <option value="Utilities">Utilities</option>
                            <option value="Housing">Housing</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="date"
                            className="form-control"
                            value={newBill.due_date}
                            onChange={(e) => setNewBill({...newBill, due_date: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-success me-2">Add Bill</button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => setShowAddForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Bill</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map(bill => (
                      <tr key={bill.bill_id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="me-2">
                              {bill.category === 'Housing' ? '🏠' : bill.category === 'Utilities' ? '⚡' : '📶'}
                            </span>
                            {bill.name}
                          </div>
                        </td>
                        <td><span className="badge bg-primary">{bill.category}</span></td>
                        <td><strong>${bill.amount.toFixed(2)}</strong></td>
                        <td>{new Date(bill.due_date).toLocaleDateString()}</td>
                        <td><span className={`badge ${getBadgeClass(bill)}`}>{getBadgeText(bill)}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                          <button className="btn btn-sm btn-success">Pay</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h6 className="mb-3">💡 Money Saving Tips</h6>
              
              {alternatives.map(alt => (
                <div key={alt.alternative_id} className="card mb-3 border-start border-success border-4">
                  <div className="card-body p-3">
                    <h6 className="card-title text-success mb-1">Save ${alt.est_saving}/month</h6>
                    <p className="card-text small mb-2">{alt.alternative_name}</p>
                    <button className="btn btn-sm btn-outline-success">Learn More</button>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Total potential savings: <strong className="text-success">$40/month</strong>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;