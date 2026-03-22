import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function CdrTable({ tableName }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const [fontSize, setFontSize] = useState(14);
  const [rowHeight, setRowHeight] = useState(42);

  // 🔥 FETCH DATA WITH OFFSET
  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.getTableData({
        tableName,
        limit: pageSize,
        offset: pageIndex * pageSize,
      });

      setData(result.rows);
      setTotalRows(result.total);

      const cols = result.columns.map((col) => ({
        accessorKey: col,
        header: col.replaceAll("_", " ").toUpperCase(),
        size: 180,
      }));

      setColumns(cols);
    };

    if (tableName) fetchData();
  }, [tableName, pageSize, pageIndex]);

  const pageCount = Math.ceil(totalRows / pageSize);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true, // 🔥 IMPORTANT
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">

      {/* 🔷 CONTROL PANEL */}
      <div className="bg-gray-50 border border-gray-300 p-5 rounded-xl shadow-sm mb-6 flex gap-6 flex-wrap">

        <input
          type="number"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="w-28 px-3 py-2 border rounded"
          placeholder="Rows"
        />

        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-28 px-3 py-2 border rounded"
          placeholder="Font"
        />

        <input
          type="number"
          value={rowHeight}
          onChange={(e) => setRowHeight(Number(e.target.value))}
          className="w-28 px-3 py-2 border rounded"
          placeholder="Row Height"
        />

      </div>

      {/* 🔷 TABLE */}
<div className="bg-white border border-gray-300 rounded-xl shadow-md">

  <div className="overflow-auto max-h-[500px]">

    <table className="w-full text-sm border-collapse">

      {/* 🔹 HEADER */}
      <thead className="sticky top-0 bg-gray-200 border-b-2 border-gray-400 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-left text-gray-900 font-bold border-r border-gray-300 last:border-none"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* 🔹 BODY */}
      <tbody>
        {table.getRowModel().rows.map((row, i) => (
          <tr
            key={row.id}
            className={`
              ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}
              hover:bg-blue-100 transition-colors duration-150
            `}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  fontSize: `${fontSize}px`,
                  minHeight: `${rowHeight}px`,
                  maxWidth: "250px",
                }}
                title={cell.getValue()}
                className="px-4 py-2 text-gray-900 border-b border-gray-300 border-r last:border-none break-words align-top"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

      {/* 🔷 MODERN PAGINATION */}
<div className="flex flex-wrap items-center justify-between mt-6 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-4">

    {/* Items per page */}
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span>Items per page</span>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPageIndex(0);
        }}
        className="border border-gray-400 px-2 py-1 rounded bg-white"
      >
        {[10, 25, 50, 100].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>

    {/* Range info */}
    <div className="text-sm text-gray-700">
      {pageIndex * pageSize + 1}–
      {Math.min((pageIndex + 1) * pageSize, totalRows)} of{" "}
      {totalRows} items
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-3">

    {/* First */}
    <button
      onClick={() => setPageIndex(0)}
      disabled={pageIndex === 0}
      className="px-2 py-1 text-gray-700 hover:text-black disabled:opacity-40"
    >
      ⏮
    </button>

    {/* Previous */}
    <button
      onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
      disabled={pageIndex === 0}
      className="px-2 py-1 text-gray-700 hover:text-black disabled:opacity-40"
    >
      ◀
    </button>

    {/* Page Input */}
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="number"
        value={pageIndex + 1}
        min={1}
        max={pageCount}
        onChange={(e) => {
          const val = Number(e.target.value) - 1;
          if (val >= 0 && val < pageCount) {
            setPageIndex(val);
          }
        }}
        className="w-12 text-center border border-gray-400 rounded px-1 py-1"
      />
      <span>of {pageCount}</span>
    </div>

    {/* Next */}
    <button
      onClick={() =>
        setPageIndex((p) => Math.min(p + 1, pageCount - 1))
      }
      disabled={pageIndex >= pageCount - 1}
      className="px-2 py-1 text-gray-700 hover:text-black disabled:opacity-40"
    >
      ▶
    </button>

    {/* Last */}
    <button
      onClick={() => setPageIndex(pageCount - 1)}
      disabled={pageIndex >= pageCount - 1}
      className="px-2 py-1 text-gray-700 hover:text-black disabled:opacity-40"
    >
      ⏭
    </button>

  </div>
</div>
    </div>
  );
}

export default CdrTable;