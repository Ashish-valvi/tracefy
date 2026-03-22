import { useEffect, useState } from "react";

function TableSelector({ setSelectedTable, setLoadTable }) {
  const [tables, setTables] = useState([]);
  const [selectedTableLocal, setSelectedTableLocal] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tables from backend
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const result = await window.api.getTables();
        setTables(result || []);
      } catch (error) {
        console.error("❌ Error fetching tables:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  // Load button click
  const handleLoad = () => {
    if (!selectedTableLocal) {
      alert("⚠️ Please select a table first");
      return;
    }

    setSelectedTable(selectedTableLocal);
    setLoadTable(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700 tracking-wide">
        Select Table
      </h2>

      {/* Dropdown + Button */}
      <div className="flex gap-3 w-full">

        {/* Dropdown */}
        <select
          value={selectedTableLocal}
          onChange={(e) => setSelectedTableLocal(e.target.value)}
          disabled={loading}
          className={`flex-1 px-4 py-2 rounded-xl border transition-all duration-200
            ${
              selectedTableLocal
                ? "border-blue-400 text-gray-800"
                : "border-gray-300 text-gray-400"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm`}
        >
          <option value="" disabled>
            {loading ? "Loading tables..." : "Select data"}
          </option>

          {tables.map((table, index) => (
            <option key={index} value={table}>
              {table}
            </option>
          ))}
        </select>

        {/* Load Button */}
        <button
          onClick={handleLoad}
          disabled={loading}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md disabled:opacity-50"
        >
          Load
        </button>
      </div>

      {/* Helper text */}
      {!selectedTableLocal && !loading && (
        <p className="text-sm text-gray-500 mt-3">
          Please select a table to continue
        </p>
      )}
    </div>
  );
}

export default TableSelector;