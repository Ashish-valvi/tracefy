import HeaderControl from "./HeaderControl";
import React from "react";

function FilterComp({ onApply }) {
  return (
    <div className="p-4">
      
      {/* 🔷 FILTER PANEL */}
      <div className="mt-4">
        <HeaderControl onApply={onApply} />
      </div>

    </div>
  );
}

export default FilterComp;