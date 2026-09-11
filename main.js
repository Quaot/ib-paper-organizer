const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");

let win;
const isDev = !app.isPackaged;

function createWindow() {
  win = new BrowserWindow({
    width: 1500,
    height: 900,
    backgroundColor: "#080a10",
    title: "IB Organizer",
    icon: path.join(__dirname, "assets", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ---------- Helpers ---------- */
async function listPdfFilesRecursive(rootDir) {
  const out = [];
  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else if (e.isFile() && e.name.toLowerCase().endsWith(".pdf")) {
        out.push(full);
      }
    }
  }
  await walk(rootDir);
  return out;
}

function settingsPath() {
  return path.join(app.getPath("userData"), "settings.json");
}

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath(), "utf8"));
  } catch {
    return {};
  }
}

function writeSettings(obj) {
  fs.mkdirSync(path.dirname(settingsPath()), { recursive: true });
  fs.writeFileSync(settingsPath(), JSON.stringify(obj, null, 2), "utf8");
}

/* ---------- IPC ---------- */
ipcMain.handle("pick-folder", async () => {
  const res = await dialog.showOpenDialog(win, {
    title: "Choose IB Papers Folder",
    properties: ["openDirectory"]
  });
  if (res.canceled || !res.filePaths?.[0]) return null;

  const folder = res.filePaths[0];
  const s = readSettings();
  s.lastFolder = folder;
  writeSettings(s);
  return folder;
});

ipcMain.handle("get-last-folder", async () => {
  const s = readSettings();
  return s.lastFolder || null;
});

ipcMain.handle("list-pdfs", async (_evt, folderPath) => {
  if (!folderPath) return [];
  return await listPdfFilesRecursive(folderPath);
});

ipcMain.handle("open-path", async (_evt, filePath) => {
  if (!filePath) return false;
  await shell.openPath(filePath);
  return true;
});

ipcMain.handle("save-copy", async (_evt, { srcPath, suggestedName }) => {
  if (!srcPath) return null;

  const res = await dialog.showSaveDialog(win, {
    title: "Save file",
    defaultPath: path.join(app.getPath("downloads"), suggestedName || path.basename(srcPath))
  });
  if (res.canceled || !res.filePath) return null;

  await fsp.copyFile(srcPath, res.filePath);

  // Set the saved file's timestamps to right now so Windows Explorer
  // shows today's date as "Date Modified" instead of the original file's date
  const now = new Date();
  await fsp.utimes(res.filePath, now, now);

  return res.filePath;
});