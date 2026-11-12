// Uses the local backend when running on localhost, otherwise the deployed backend.
const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const API_URL = isLocal
    ? "http://localhost:9000"
    : "https://mern-crm-server-nibr.onrender.com";
