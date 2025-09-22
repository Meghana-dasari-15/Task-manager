import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
      alert("Error fetching tasks — check backend is running.");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(task) {
    await createTask(task);
    load();
  }

  async function handleToggle(id, currentStatus) {
    await updateTask(id, {
      status: currentStatus === "pending" ? "completed" : "pending",
    });
    load();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    load();
  }

  // 🔹 New Edit Handler
  async function handleEdit(id, updatedTask) {
    await updateTask(id, updatedTask);
    load();
  }

  return (
    <div className="app">
      <h1>📝 Task Manager</h1>
      <TaskForm onAdd={handleAdd} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit} // ✅ Pass edit handler
        />
      )}
    </div>
  );
}



