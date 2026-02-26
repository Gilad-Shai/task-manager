import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import useLocalStorage from "./hooks/useLocalStorage";
import { sortTasks } from "./utils/sortTasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      text: taskData.text,
      priority: taskData.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "low") return task.priority === "low";
    if (filter === "medium") return task.priority === "medium";
    if (filter === "high") return task.priority === "high";
    return true;
  });

  const sortedTasks = sortTasks(filteredTasks, sortBy);

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Daily Task Manager</h1>
        <p className="app-subtitle">Stay organized and productive</p>
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask} />

        <div className="stats-bar">
          <span className="stat">
            <strong>{counts.all}</strong> total
          </span>
          <span className="stat active-stat">
            <strong>{counts.active}</strong> active
          </span>
          <span className="stat completed-stat">
            <strong>{counts.completed}</strong> completed
          </span>
        </div>

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <TaskList
          tasks={sortedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;