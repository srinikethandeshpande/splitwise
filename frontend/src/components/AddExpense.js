import React, { useState } from "react";

const AddExpense = () => {
  const [groupId, setGroupId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [message, setMessage] = useState("");

  const handleAddExpense = async () => {
    const res = await fetch(`http://localhost:8000/groups/${groupId}/expenses/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: parseFloat(amount),
        payer_id: parseInt(payerId),
      }),
    });

    if (res.ok) {
      setMessage("Expense added successfully ✅");
      setDescription("");
      setAmount("");
      setPayerId("");
    } else {
      setMessage("Failed to add expense ❌");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">💸 Add Expense</h2>
      <input
        type="text"
        value={groupId}
        placeholder="Group ID"
        onChange={(e) => setGroupId(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <input
        type="text"
        value={payerId}
        placeholder="Payer User ID"
        onChange={(e) => setPayerId(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />
      <button
        onClick={handleAddExpense}
        className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
      >
        Add
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default AddExpense;
