import React from "react";
import CreateUser from "./components/CreateUser";
import CreateGroup from "./components/CreateGroup";
import AddExpense from "./components/AddExpense";
import ViewBalances from "./components/ViewBalances";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        SPLITWISE
      </h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        <CreateUser />
        <CreateGroup />
        <AddExpense />
        <ViewBalances />
      </div>
    </div>
  );
}

export default App;
