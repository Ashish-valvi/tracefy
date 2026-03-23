import { useState } from "react";
import FilterComp from "./FilterComp";
import TableSelector from "./TableSelector";
import CdrTable from "./CdrTable";

function Dashboard() {
  const [selectedTable, setSelectedTable] = useState("");
  const [loadTable, setLoadTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showTableSelector, setShowTableSelector] = useState(false);

  return (
    <>
      {/* 🔷 TOP BAR */}
      <div className="flex justify-between items-center px-6 mt-4">
        <button
          onClick={() => setShowTableSelector(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Select CDR
        </button>
      </div>

      {/* 🔷 TABLE SELECTOR */}
      {showTableSelector && (
        <TableSelector
          setSelectedTable={setSelectedTable}
          setLoadTable={setLoadTable}
          onLoad={() => setShowTableSelector(false)} // ✅ FIXED
        />
      )}

      {/* 🔷 MAIN CONTENT */}
      {loadTable && (
        <>
          {/* 🔷 TABLE HEADER */}
          <div className="flex justify-between items-center px-6 mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedTable}
            </h2>

            <button
              onClick={() => setShowFilters(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Filters
            </button>
          </div>

          {/* 🔷 FILTER PANEL */}
          {showFilters && (
            <FilterComp onApply={() => setShowFilters(false)} />
          )}

          {/* 🔷 TABLE */}
          <CdrTable tableName={selectedTable} />
        </>
      )}
    </>
  );
}

export default Dashboard;