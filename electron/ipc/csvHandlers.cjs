const { ipcMain } = require("electron");
const { processCSV } = require("../services/csvService.cjs");

function registerCSVHandlers() {
  ipcMain.handle("create-db-store-data", async (event, filePath) => {
    return processCSV(filePath);
  });
}

module.exports = registerCSVHandlers;