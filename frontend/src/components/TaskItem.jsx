import React, { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  async function handleSave() {
    if (!editTitle.trim()) return alert("Title cannot be empty");
    await onEdit(task.id, {
      ...task,
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false); // ✅ back to normal mode
  }

  return (
    <li className="task-item">
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{
                padding: "4px 6px",
                marginBottom: "4px",
                width: "70%",
                fontSize: "0.9rem",
              }}
            />
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{
                padding: "4px 6px",
                width: "70%",
                fontSize: "0.85rem",
              }}
            />
          </>
        ) : (
          <>
            <div
              className={`title ${
                task.status === "completed" ? "completed" : ""
              }`}
            >
              {task.title}
            </div>
            <div className="desc">{task.description}</div>
          </>
        )}
      </div>

      <div className="task-actions">
        {/* Toggle Switch */}
        <label className="switch">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => onToggle(task.id, task.status)}
          />
          <span className="slider round"></span>
        </label>

        <div style={{ fontSize: "13px", marginTop: "5px" }}>
          {task.status === "completed" ? "✅ Completed" : "⏳ Pending"}
        </div>

        {/* Buttons */}
        {isEditing ? (
          <button
            onClick={handleSave}
            style={{
              marginTop: "6px",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4f46e5",
              color: "white",
              fontWeight: "bold",
            }}
          >
            💾 Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditTitle(task.title); // reset with current values
              setEditDescription(task.description);
              setIsEditing(true);
            }}
            style={{
              marginTop: "6px",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "bold",
            }}
          >
            ✏️ Edit
          </button>
        )}

        <button
          onClick={() => {
            if (confirm("Delete?")) onDelete(task.id);
          }}
          style={{
            marginTop: "6px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🗑 Delete
        </button>
      </div>
    </li>
  );
}
