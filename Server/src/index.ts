import WebSocket from "ws";
import fs from "fs";

console.log("Loading Configuration...");
export const config = JSON.parse(fs.readFileSync("./config/config.json", "utf-8"));

const wsd = new WebSocket.Server({
    port: config.ports.websocket
})

wsd.on("connection", (user) => {
    user.send("hello");
});
