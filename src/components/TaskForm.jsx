import { useState } from "react";

const PRIORITY_LEVELS = ["Low", "Medium", "High"];

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError("Task title cannot be empty.");
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title: trimmed,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setPriority("Medium");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form__heading">Add New Task</h2>

      <div className="task-form__row">
        <input
          type="text"
          className={`task-form__input ${error ? "task-form__input--error" : ""}`}
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          aria-label="Task title"
        />

        <select
          className="task-form__select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority level"
        >
          {PRIORITY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <button type="submit" className="task-form__button">
          Add Task
        </button>
      </div>

      {error && (
        <p className="task-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}