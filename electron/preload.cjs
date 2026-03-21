const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  hello: () => console.log("Hello from Electron 👋"),
});