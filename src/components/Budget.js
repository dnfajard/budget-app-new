import React, { useState } from 'react';

const Budget = ({ budget, bills }) => {
  const [budgetLimit, setBudgetLimit] = useState(budget?.monthly_limit || 3500);
  const [alertEnabled, setAlertEnabled] = useState(budget?.alert || true);
  const [alertThreshold, setAlertThreshold] = useState(80);

  // Default bills data if not provided
  const defaultBills = [
    { id: 1, name: 'Rent', category: 'Housing', amount: 1850.00 },
    { id: 2, name: 'Electric Bill', category: 'Utilities', amount: 125.50 },
    { id: 3, name: 'Internet', category: 'Utilities', amount: 79.99 }
  ];

  const billsData = bills || defaultBills;

  const totalSpent = billsData.reduce((sum, bill) => sum + bill.amount, 0);
  const housingExpenses = billsData.filter(bill => bill.category === 'Housing').reduce((sum, bill) => sum + bill.amount, 0);
  const utilitiesExpenses = billsData.filter(bill => bill.category === 'Utilities').reduce((sum, bill) => sum + bill.amount, 0);
  const remaining = budgetLimit - totalSpent;

  const handleUpdateBudget = (e) => {
    e.preventDefault();
    console.log('Budget updated:', {
      budgetLimit,
      alertEnabled,
      alertThreshold
    });
    alert('✅ Budget settings updated!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-light text-gray-900 mb-8">Budget Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <h5 className="text-lg font-medium mb-6">Monthly Budget Breakdown</h5>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>🏠 Housing</span>
                <span className="font-semibold">${housingExpenses.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min((housingExpenses / budgetLimit) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>⚡ Utilities</span>
                <span className="font-semibold">${utilitiesExpenses.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${Math.min((utilitiesExpenses / budgetLimit) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>💰 Available</span>
                <span className="font-semibold">${Math.max(remaining, 0).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                  style={{width: `${Math.max(Math.min((remaining / budgetLimit) * 100, 100), 0)}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 text-center border-t border-gray-200 pt-4">
            <div>
              <h4 className="text-2xl font-semibold text-green-500 mb-0">
                ${Math.max(remaining, 0).toLocaleString()}
              </h4>
              <small className="text-gray-500">Available</small>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-red-500 mb-0">
                ${totalSpent.toLocaleString()}
              </h4>
              <small className="text-gray-500">Spent</small>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-blue-500 mb-0">
                ${budgetLimit.toLocaleString()}
              </h4>
              <small className="text-gray-500">Total Budget</small>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h5 className="text-lg font-medium mb-6">⚙️ Budget Settings</h5>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Budget Limit
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(parseFloat(e.target.value) || 0)}
                  className="flex-1 border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={alertEnabled}
                  onChange={(e) => setAlertEnabled(e.target.checked)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Enable budget alerts</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold
              </label>
              <select
                value={`${alertThreshold}% of budget used`}
                onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!alertEnabled}
              >
                <option value="80">80% of budget used</option>
                <option value="90">90% of budget used</option>
                <option value="100">Budget exceeded</option>
              </select>
            </div>
            
            <button 
              onClick={handleUpdateBudget}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition-colors"
            >
              Update Budget
            </button>
          </div>

          {/* Budget Health Indicator */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h6 className="font-medium mb-3">Budget Health</h6>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#f1f3f4"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke={
                      (totalSpent / budgetLimit) > 0.9 ? "#dc3545" : 
                      (totalSpent / budgetLimit) > 0.75 ? "#ffc107" : "#28a745"
                    }
                    strokeWidth="10"
                    strokeDasharray={`${Math.min((totalSpent / budgetLimit) * 220, 220)} 220`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {Math.round((totalSpent / budgetLimit) * 100)}%
                  </span>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                (totalSpent / budgetLimit) > 0.9 ? 'text-red-600' : 
                (totalSpent / budgetLimit) > 0.75 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {(totalSpent / budgetLimit) > 0.9 ? 'Over Budget!' : 
                 (totalSpent / budgetLimit) > 0.75 ? 'Approaching Limit' : 'On Track'}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h6 className="font-medium mb-3">Quick Actions</h6>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                📊 View Spending History
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                📈 Set Savings Goals
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                📱 Export Budget Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h5 className="text-lg font-medium mb-6">💡 Budget Insights</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h6 className="font-medium text-gray-900">Spending Trend</h6>
            <p className="text-lg font-semibold text-blue-500">
              {(totalSpent / budgetLimit) > 0.8 ? '+15%' : '-5%'}
            </p>
            <small className="text-gray-600">vs last month</small>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h6 className="font-medium text-gray-900">Savings Rate</h6>
            <p className="text-lg font-semibold text-green-500">
              {Math.max(0, Math.round((remaining / budgetLimit) * 100))}%
            </p>
            <small className="text-gray-600">of total budget</small>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h6 className="font-medium text-gray-900">Days Remaining</h6>
            <p className="text-lg font-semibold text-yellow-600">
              {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()}
            </p>
            <small className="text-gray-600">in this month</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;