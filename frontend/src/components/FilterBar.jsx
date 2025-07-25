import React, { useState } from "react";

export default function FilterBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 flex-grow"
      />
      <button type="submit" className="px-4 bg-green-600 text-white">
        Search
      </button>
    </form>
  );
}
