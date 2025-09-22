const API_BASE = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";
const TASKS_API = `${API_BASE}/tasks`;

export async function fetchTasks() {
  const r = await fetch(TASKS_API);
  if (!r.ok) throw new Error("Failed to fetch tasks");
  return r.json();
}

export async function createTask(data) {
  const r = await fetch(TASKS_API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Create failed");
  return r.json();
}

export async function updateTask(id, data) {
  const r = await fetch(`${TASKS_API}/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Update failed");
  return r.json();
}

export async function deleteTask(id) {
  const r = await fetch(`${TASKS_API}/${id}`, { method: "DELETE" });
  if (!r.ok && r.status !== 204) throw new Error("Delete failed");
  return;
}
