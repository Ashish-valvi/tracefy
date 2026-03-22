import HeaderControl from "./HeaderControl";
import React, { useState } from 'react';

function FilterComp() {
  const [load, setLoad] = useState(false);

  return (
    <>
      <div className="p-4 " >
        <button 
          className="bg-red-700 text-white p-2 rounded" 
          onClick={() => setLoad(!load)} // This toggles between true and false
        >
          {load ? "Hide" : "Show"} Header Control
        </button>

        {/* This is where the component actually renders based on the state */}
        <div className="mt-4">
          {load && <HeaderControl />}
        </div>
      </div>
    </>
  );
}

export default FilterComp;