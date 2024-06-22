// Entry point of Electron main process

import { app, BrowserWindow } from "electron";
import startup from "electron-squirrel-startup";

import createServer from "../server/server.js";
import createWindow from "./window.js";

// Squirrel first launch setup
if (startup) app.quit();

// Wait for Electron to be ready, then create the main window
app.whenReady().then(() => {
    createWindow();

    // macOS restoration
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

createServer();

// When all windows are closed, quit unless on macOS.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});