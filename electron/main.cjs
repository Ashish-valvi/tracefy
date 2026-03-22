const { app , Menu } = require("electron");
const createWindow = require("./windows/createWindow.cjs");
const registerDBHandlers = require("./ipc/dbHandlers.cjs");
const registerFileHandlers = require("./ipc/fileHandlers.cjs");
const registerCSVHandlers = require("./ipc/csvHandlers.cjs");
const {getTableList} = require("./ipc/tableList.cjs")



app.whenReady().then(() => {
  Menu.setApplicationMenu(null); 
  createWindow();

  // -------------------IPC
    // Register all IPC handlers
  registerDBHandlers();
  registerFileHandlers();
  registerCSVHandlers();
  getTableList();
});

