import next from "next";
import express from "express";
import url from "node:url";
import constants from "../constants.js";

// TODO: Use a proper logging library

// Development configuration
// Other Next.js configuration remains the same
import nextConfig from "../../next.config.js";
import { resolve } from "node:path";
nextConfig.distDir = ".next";
nextConfig.output = "standalone";

let port = -1;
let ongoing = null;

/**
 * Creates a local server and configures it to serve the web UI and graphical assets.
 * Uses the Next.js server when in development.
 * @returns {Promise<Number>} Resolves to the port of the existing or newly created server
 */
export default function makeServer() {
    if (port > 0) return new Promise((res) => res(port));
    if (ongoing != null) return ongoing;

    const server = express();

    console.log("Starting server...");

    server.get("/gfx/*", (req, res) => {
        // TODO: Implement graphics
        res.setHeader("Content-Type", "image/png");
        res.send();
    });

    let app;
    if (constants.development) {
        app = next({
            customServer: true,
            dev: true,
            conf: nextConfig
        });

        const handler = app.getRequestHandler();

        server.get("/*", (req, res) => {
            handler(req, res, url.parse(req.url, true));
        });
    } else {
        server.use("/celestial-feather", express.static(constants.root_web));
    }

    return ongoing = new Promise(async (res) => {
        if (constants.development) await app.prepare();
        // TODO: Port error catching
        let listener = server.listen(constants.development ? 7773 : undefined, undefined, () => {
            port = listener.address().port;
            res(port);
            console.log("Server up! http://localhost:" + port);
            ongoing = null;
        });
    });
}