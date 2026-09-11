const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ib", {
  pickFolder: () => ipcRenderer.invoke("pick-folder"),
  getLastFolder: () => ipcRenderer.invoke("get-last-folder"),
  listPdfs: (folderPath) => ipcRenderer.invoke("list-pdfs", folderPath),
  openPath: (filePath) => ipcRenderer.invoke("open-path", filePath),
  saveCopy: (srcPath, suggestedName) =>
    ipcRenderer.invoke("save-copy", { srcPath, suggestedName }),
});
