import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter title");
    await onAdd({ title, description, status: "pending" });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add</button>
    </form>
  );
}
