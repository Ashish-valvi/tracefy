import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import useFilterStore from "../store/useFilterStore";

function CdrTable({ tableName }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const [fontSize, setFontSize] = useState(14);
  const [rowHeight, setRowHeight] = useState(42);
  const [showSettings, setShowSettings] = useState(false);

  const filters = useFilterStore((state) => state.filters);

  const [columnSizing, setColumnSizing] = useState({});

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const result = await window.api.getTableData({
        tableName,
        limit: pageSize,
        offset: pageIndex * pageSize,
      });

      setData(result.rows);
      setTotalRows(result.total);

      let visibleCols = result.columns.filter(
        (col) => col === "id" || filters[col]
      );

      visibleCols = [
        ...visibleCols.filter((col) => col === "id"),
        ...visibleCols.filter((col) => col !== "id"),
      ];

      const cols = visibleCols.map((col) => ({
        accessorKey: col,
        header: col.replaceAll("_", " ").toUpperCase(),
        size: col === "id" ? 100 : 180,
      }));

      setColumns(cols);
    };

    if (tableName) fetchData();
  }, [tableName, pageSize, pageIndex, filters]);

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
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">

      {/* 🔷 TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">CDR Table</h1>

        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Adjust
        </button>
      </div>

      {/* 🔷 SETTINGS PANEL */}
      {showSettings && (
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-md mb-6 w-[300px]">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Table Settings
          </h2>

          <div className="flex flex-col gap-4">

            <div>
              <label className="text-xs text-gray-600">Font Size</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-1 px-2 py-1 border rounded bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Row Height</label>
              <input
                type="number"
                value={rowHeight}
                onChange={(e) => setRowHeight(Number(e.target.value))}
                className="w-full mt-1 px-2 py-1 border rounded bg-white text-gray-900"
              />
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="bg-green-600 hover:bg-green-700 text-white py-1 rounded"
            >
              Set
            </button>

          </div>
        </div>
      )}

      {/* 🔷 TABLE */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md">
        <div className="overflow-auto">

          <table className="w-full text-sm border-collapse table-fixed">

            {/* HEADER */}
            <thead className="sticky top-0 bg-gray-200 border-b-2 border-gray-400 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="relative px-4 py-3 text-left font-bold border-r border-gray-300 text-gray-900"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* RESIZER */}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-[8px] cursor-col-resize group"
                      >
                        <div className="w-[2px] h-full bg-gray-400 mx-auto group-hover:bg-blue-600" />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* BODY */}
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-blue-100`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        fontSize: `${fontSize}px`,
                        paddingTop: `${rowHeight / 4}px`,
                        paddingBottom: `${rowHeight / 4}px`,
                        width: cell.column.getSize(),
                      }}
                      title={cell.getValue()}
                      className="px-4 border-b border-gray-300 border-r 
                      whitespace-nowrap overflow-hidden text-ellipsis text-gray-900"
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

      {/* 🔷 PAGINATION */}
      <div className="flex flex-wrap items-center justify-between mt-6 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">

        {/* LEFT SIDE (UNCHANGED) */}
        <div className="flex items-center gap-4">
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

          <div className="text-sm text-gray-700">
            {pageIndex * pageSize + 1}–
            {Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows}
          </div>
        </div>

        {/* 🔥 RIGHT SIDE (MODERN PAGINATION) */}
        <div className="flex items-center gap-2">

          {/* BACK */}
          <button
            onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
            disabled={pageIndex === 0}
            className="px-3 py-1 text-sm rounded bg-blue-500 text-white disabled:opacity-40"
          >
            ‹ BACK
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex items-center gap-1">
            {Array.from({ length: pageCount }).map((_, i) => {
              if (
                i === 0 ||
                i === pageCount - 1 ||
                (i >= pageIndex - 1 && i <= pageIndex + 1)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => setPageIndex(i)}
                    className={`w-8 h-8 text-sm rounded-full border ${
                      pageIndex === i
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }

              if (i === pageIndex - 2 || i === pageIndex + 2) {
                return (
                  <span key={i} className="px-1 text-gray-500">
                    ...
                  </span>
                );
              }

              return null;
            })}
          </div>

          {/* NEXT */}
          <button
            onClick={() =>
              setPageIndex((p) => Math.min(p + 1, pageCount - 1))
            }
            disabled={pageIndex >= pageCount - 1}
            className="px-3 py-1 text-sm rounded bg-blue-500 text-white disabled:opacity-40"
          >
            NEXT ›
          </button>

        </div>
      </div>
    </div>
  );
}

export default CdrTable;