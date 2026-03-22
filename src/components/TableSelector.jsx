import { useEffect, useState } from "react";

function TableSelector() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      const result = await window.api.getTables();
      setTables(result);
    };

    fetchTables();
  }, []);

  const handleClick = () => {
    if (!selectedTable) {
      console.log("⚠️ Please select a table first");
      return;
    }

    console.log("Selected Table:", selectedTable);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      
      <h2 className="text-xl font-semibold mb-4 text-gray-700 tracking-wide">
        Select Table
      </h2>

      <div className="flex gap-3 w-full">
        
        {/* Dropdown */}
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className={`flex-1 px-4 py-2 rounded-xl border transition-all duration-200
            ${
              selectedTable
                ? "border-blue-400 text-gray-800"
                : "border-gray-300 text-gray-400"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm`}
        >
          {/* Placeholder */}
          <option value="" disabled>
            Select data
          </option>

          {tables.map((table, index) => (
            <option key={index} value={table}>
              {table}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleClick}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
        >
          Load
        </button>
      </div>

      {/* Optional helper text */}
      {!selectedTable && (
        <p className="text-sm text-gray-500 mt-3">
          Please select a table to continue
        </p>
      )}
    </div>
  );
}

export default TableSelector;