import "./global.css";

// TODO: Metadata JSON file for both Next.js and Electron Forge
/** @type {import("next").Metadata} */
export const metadata = {
    title: "Celestial Feather",
    description: "A web-based dialog editor for Celeste.",
    applicationName: "celestial-feather",
    openGraph: {
        title: "Celestial Feather",
        description: "A web-based dialog editor for Celeste.",
        siteName: "celestial-feather",
    }
}

export default function Layout({ children }) {
    return <html>
        <body>
            { children }
        </body>
    </html>;
}