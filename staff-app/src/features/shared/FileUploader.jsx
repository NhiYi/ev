import React from "react";

export default function FileUploader({ onChange }) {
  const handleFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    onChange(e.target.files[0]);
  };

  return (
    <div>
      <label style={{ fontWeight: "bold" }}>Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{
          marginTop: "8px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}
