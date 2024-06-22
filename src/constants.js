import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    /** Whether the application is in development or not - uses IN_DEV environmental variable */
    development: !!process.env.IN_DEV,
    /** The path to the root of the app - where package.json is located */
    root: path.join(__dirname, ".."),
    /** The path to the app source code folder */
    root_src: path.join(__dirname),
    /** The path to the static web UI folder */
    root_web: path.join(__dirname, "../web"),
    /** The path to the Electron main process source code folder */
    root_electron: path.join(__dirname, "electron"),
};