import React, { useState } from "react";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [memberIds, setMemberIds] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateGroup = async () => {
    const ids = memberIds.split(",").map((id) => parseInt(id.trim()));
    const res = await fetch("http://localhost:8000/groups/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, member_ids: ids }),
    });

    if (res.ok) {
      setMessage("Group created successfully ✅");
      setName("");
      setMemberIds("");
    } else {
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">👥 Create Group</h2>
      <input
        type="text"
        value={name}
        placeholder="Group name"
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <input
        type="text"
        value={memberIds}
        placeholder="Member IDs (comma separated)"
        onChange={(e) => setMemberIds(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <button
        onClick={handleCreateGroup}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        Create
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default CreateGroup;
