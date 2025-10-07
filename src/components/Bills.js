import React, { useState } from 'react';

const CATEGORIES = ['Utilities', 'Housing', 'Transportation', 'Food', 'Entertainment'];

const CATEGORY_ICONS = {
  Housing: '🏠',
  Utilities: '⚡',
  default: '📶'
};

const STATUS_CONFIG = {
  expensive: { class: 'bg-danger', text: 'Expensive', check: (bill) => bill.amount > 500 },
  due_soon: { class: 'bg-warning text-dark', text: 'Due Soon' },
  paid: { class: 'bg-success', text: 'Paid' },
  pending: { class: 'bg-secondary', text: 'Pending' }
};

const Bills = ({ bills, setBills, alternatives }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    category: 'Utilities',
    due_date: ''
  });

  const handleAddBill = (e) => {
    e.preventDefault();
    const amount = parseFloat(newBill.amount);
    const bill = {
      bill_id: Math.max(0, ...bills.map(b => b.bill_id)) + 1,
      user_id: 1,
      ...newBill,
      amount,
      isExpensive: amount > 500,
      status: 'pending'
    };
    setBills([...bills, bill]);
    setNewBill({ name: '', amount: '', category: 'Utilities', due_date: '' });
    setShowAddForm(false);
  };

  const handleEditClick = (bill) => {
    setEditingBill({
      ...bill,
      amount: bill.amount.toString()
    });
  };

  const handleSaveEdit = () => {
    const amount = parseFloat(editingBill.amount);
    const updatedBill = {
      ...editingBill,
      amount,
      isExpensive: amount > 500
    };
    
    setBills(bills.map(b => 
      b.bill_id === updatedBill.bill_id ? updatedBill : b
    ));
    setEditingBill(null);
  };

  const handleCancelEdit = () => {
    setEditingBill(null);
  };

  const updateField = (field, value) => {
    setNewBill(prev => ({ ...prev, [field]: value }));
  };

  const updateEditField = (field, value) => {
    setEditingBill(prev => ({ ...prev, [field]: value }));
  };

  const getBillStatus = (bill) => {
    if (bill.isExpensive) return STATUS_CONFIG.expensive;
    return STATUS_CONFIG[bill.status] || STATUS_CONFIG.pending;
  };

  const getCategoryIcon = (category) => {
    return CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
  };

  const totalSavings = alternatives.reduce((sum, alt) => sum + alt.est_saving, 0);

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
                    <div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bill Name"
                            value={newBill.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            value={newBill.amount}
                            onChange={(e) => updateField('amount', e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <select
                            className="form-select"
                            value={newBill.category}
                            onChange={(e) => updateField('category', e.target.value)}
                          >
                            {CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="date"
                            className="form-control"
                            value={newBill.due_date}
                            onChange={(e) => updateField('due_date', e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <button 
                            type="button"
                            className="btn btn-success me-2"
                            onClick={handleAddBill}
                          >
                            Add Bill
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => setShowAddForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
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
                    {bills.map(bill => {
                      const status = getBillStatus(bill);
                      const isEditing = editingBill && editingBill.bill_id === bill.bill_id;
                      
                      return (
                        <tr key={bill.bill_id}>
                          <td>
                            {isEditing ? (
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={editingBill.name}
                                onChange={(e) => updateEditField('name', e.target.value)}
                              />
                            ) : (
                              <div className="d-flex align-items-center">
                                <span className="me-2">{getCategoryIcon(bill.category)}</span>
                                {bill.name}
                              </div>
                            )}
                          </td>
                          <td>
                            {isEditing ? (
                              <select
                                className="form-select form-select-sm"
                                value={editingBill.category}
                                onChange={(e) => updateEditField('category', e.target.value)}
                              >
                                {CATEGORIES.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="badge bg-primary">{bill.category}</span>
                            )}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={editingBill.amount}
                                onChange={(e) => updateEditField('amount', e.target.value)}
                              />
                            ) : (
                              <strong>${bill.amount.toFixed(2)}</strong>
                            )}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                value={editingBill.due_date}
                                onChange={(e) => updateEditField('due_date', e.target.value)}
                              />
                            ) : (
                              new Date(bill.due_date).toLocaleDateString()
                            )}
                          </td>
                          <td><span className={`badge ${status.class}`}>{status.text}</span></td>
                          <td>
                            {isEditing ? (
                              <>
                                <button 
                                  className="btn btn-sm btn-success me-1"
                                  onClick={handleSaveEdit}
                                >
                                  Save
                                </button>
                                <button 
                                  className="btn btn-sm btn-secondary"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  className="btn btn-sm btn-outline-secondary me-1"
                                  onClick={() => handleEditClick(bill)}
                                >
                                  Edit
                                </button>
                                <button className="btn btn-sm btn-success">Pay</button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
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
                  Total potential savings: <strong className="text-success">${totalSavings}/month</strong>
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