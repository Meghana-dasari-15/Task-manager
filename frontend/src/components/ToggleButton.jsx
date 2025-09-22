import React, { useState } from "react";

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  function handleToggle() {
    setIsOn(!isOn); // flip the state
  }

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button
        onClick={handleToggle}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          backgroundColor: isOn ? "green" : "red",
          color: "white"
        }}
      >
        {isOn ? "ON" : "OFF"}
      </button>
      <p>Status: {isOn ? "Completed ✅" : "Pending ❌"}</p>
    </div>
  );
}
