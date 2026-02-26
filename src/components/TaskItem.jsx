import React from 'react';

const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const PRIORITY_CLASSES = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="task-checkbox"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <label htmlFor={`task-${task.id}`} className="task-checkbox-label" />
      </div>

      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`task-priority-badge ${PRIORITY_CLASSES[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      <button
        className="task-delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task "${task.title}"`}
        title="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  );
}