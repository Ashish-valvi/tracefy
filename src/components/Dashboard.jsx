import { useState } from "react";
import FilterComp from "./FilterComp";
import TableSelector from "./TableSelector";
import CdrTable from "./CdrTable";

function Dashboard() {
  const [selectedTable, setSelectedTable] = useState("");
  const [loadTable, setLoadTable] = useState(false);

  return (
    <>
      <TableSelector 
        setSelectedTable={setSelectedTable} 
        setLoadTable={setLoadTable}
      />

      {loadTable && (
        <>
          <FilterComp />
          <CdrTable tableName={selectedTable} />
        </>
      )}
    </>
  );
}

export default Dashboard;