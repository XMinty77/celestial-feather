import { BrowserWindow } from "electron";
import path from "node:path";

import createServer from "../server/server.js";
import constants from "../constants.js";

/** @type {BrowserWindow} */
let mainWindow = null;

/**
 * Creates the main Electron window, and loads the main UI after the local server is ready.
 * @returns {Promise<BrowserWindow>} Resolves to the existing or newly created main window
 */
export default function createWindow() {
    // TODO: Error handling
    return new Promise(async (res, rej) => {
        if (mainWindow != null) return mainWindow;

        // TODO: Add appropriate background color
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            show: false,
            paintWhenInitiallyHidden: true,
            webPreferences: {
                preload: path.join(constants.root_electron, "preload.js"),
            },
        });

        mainWindow.on("ready-to-show", () => {
            mainWindow.show();
            mainWindow.maximize();
        });

        // De-reference when the window is closed
        mainWindow.on("remove", () => {
            mainWindow = null;
        });

        res(mainWindow);

        // Load when server is loaded
        const port = await createServer();
        mainWindow.loadURL("http://localhost:" + port + "/celestial-feather");

        // Open devtools if in development
        if (constants.development) mainWindow.webContents.openDevTools();
    });
}