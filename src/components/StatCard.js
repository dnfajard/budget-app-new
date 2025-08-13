import React from 'react';

const StatCard = ({ icon, title, value, subtitle, color = "primary" }) => (
  <div className="col-md-3 mb-3">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body text-center p-4">
        <div className={`mb-2 text-${color}`}>
          <i className={`${icon} fa-2x`}></i>
        </div>
        <div className="text-muted small mb-1">{title}</div>
        <h3 className={`mb-1 text-${color} fw-bold`}>{value}</h3>
        <div className="text-muted small">{subtitle}</div>
      </div>
    </div>
  </div>
);

export default StatCard;