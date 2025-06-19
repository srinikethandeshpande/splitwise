import React, { useState } from "react";

const ViewBalances = () => {
  const [groupId, setGroupId] = useState("");
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState("");

  const handleViewBalances = async () => {
    const res = await fetch(`http://localhost:8000/groups/${groupId}/balances/`);
    if (res.ok) {
      const data = await res.json();
      setBalances(data);
      setError("");
    } else {
      setError("Could not fetch balances ❌");
      setBalances([]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">📊 View Group Balances</h2>
      <input
        type="text"
        value={groupId}
        placeholder="Group ID"
        onChange={(e) => setGroupId(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <button
        onClick={handleViewBalances}
        className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
      >
        View
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {balances.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium">Balances:</h3>
          <ul className="list-disc list-inside">
            {balances.map((b, idx) => (
              <li key={idx}>
                User {b.user_id}: <span className={b.balance >= 0 ? "text-green-600" : "text-red-600"}>{b.balance}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewBalances;
