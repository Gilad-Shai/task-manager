import React from 'react';

const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High'];
const STATUS_OPTIONS = ['All', 'Active', 'Completed'];

export default function FilterBar({ priorityFilter, statusFilter, onPriorityChange, onStatusChange, taskCounts }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label className="filter-label">Priority:</label>
        <div className="filter-buttons">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option}
              className={`filter-btn priority-filter ${priorityFilter === option ? 'active' : ''} ${option.toLowerCase()}`}
              onClick={() => onPriorityChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status:</label>
        <div className="filter-buttons">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              className={`filter-btn status-filter ${statusFilter === option ? 'active' : ''}`}
              onClick={() => onStatusChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="task-counts">
        <span className="count-badge total">
          Total: {taskCounts.total}
        </span>
        <span className="count-badge active">
          Active: {taskCounts.active}
        </span>
        <span className="count-badge completed">
          Completed: {taskCounts.completed}
        </span>
      </div>
    </div>
  );
}