import React from "react";
import { HeaderObject } from "./extraData";
import useFilterStore from "../store/useFilterStore";

function HeaderControl({ onApply }) { // ✅ receive function

  const { filters, toggleFilter } = useFilterStore();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-3">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Filter Columns
          </h1>

          <button
            onClick={() => {
              console.log("Active Filters:", filters);
              onApply(); // 🔥 CLOSE PANEL
            }}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            Apply Filters
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(HeaderObject).map((key) => {
            const isChecked = filters[key];

            return (
              <div
                key={key}
                onClick={() => toggleFilter(key)}
                className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer ${
                  isChecked
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFilter(key)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />

                <label className="ml-3 text-sm font-medium text-gray-700 truncate">
                  {key}
                </label>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Selected:{" "}
          <span className="font-semibold text-gray-700">
            {Object.values(filters).filter(Boolean).length}
          </span>{" "}
          / {Object.keys(filters).length}
        </div>
      </div>
    </div>
  );
}

export default HeaderControl;