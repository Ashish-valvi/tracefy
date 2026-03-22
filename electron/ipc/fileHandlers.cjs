const { ipcMain, dialog } = require("electron");

function registerFileHandlers() {
  ipcMain.handle("select-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
    });

    if (result.canceled) return null;
    return result.filePaths[0];
  });
}

module.exports = registerFileHandlers;