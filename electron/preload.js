const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  createDB: (filePath) => ipcRenderer.invoke("create-db-store-data", filePath),
  selectFile: () => ipcRenderer.invoke("select-file"),
  getData: (params) => ipcRenderer.invoke("get-data", params),
  getTables: () => ipcRenderer.invoke("get-tables"),
   getTableData: (params) => ipcRenderer.invoke("get-table-data", params)
});
