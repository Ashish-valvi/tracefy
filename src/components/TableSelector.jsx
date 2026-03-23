import { useEffect, useState } from "react";

function TableSelector({ setSelectedTable, setLoadTable, onLoad }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState("");

  // 🔥 Fetch tables
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

  // 🔥 Load table
  const handleLoad = (table) => {
    setActiveTable(table);
    setSelectedTable(table);
    setLoadTable(true);

    if (onLoad) onLoad(); // ✅ hides selector
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Select Table
      </h2>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 py-6 animate-pulse">
          Loading tables...
        </div>
      )}

      {/* Table List */}
      {!loading && (
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">

          {tables.map((table, index) => {
            const isActive = activeTable === table;

            return (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 border-blue-400 shadow-sm"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {/* Table Name */}
                <div className="text-sm font-medium text-gray-700 truncate">
                  {table}
                </div>

                {/* Load Button */}
                <button
                  onClick={() => handleLoad(table)}
                  disabled={loading}
                  className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } disabled:opacity-50`}
                >
                  {isActive ? "Loaded" : "Load"}
                </button>
              </div>
            );
          })}

          {/* Empty state */}
          {tables.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No tables found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TableSelector;