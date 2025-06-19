import React, { useState } from "react";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUser = async () => {
    const res = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMessage("User created successfully ✅");
      setName("");
    } else {
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">➕ Create User</h2>
      <input
        type="text"
        value={name}
        placeholder="Enter user name"
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <button
        onClick={handleCreateUser}
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Create
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default CreateUser;
