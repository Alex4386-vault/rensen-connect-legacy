import WebSocket from "ws";
import fs from "fs";
import { sendHandshakeSuccess, handleHandshake } from "./Packets/Handshake";
import { PacketInterface, PacketTypes } from "./Packets";

console.log("RENSEN-CONNECT");
console.log("Copyright (c) Alex4386 and Rensen-Connect Contributors");
console.log("This software is distributed under HRPL and MIT");
console.log();
console.log("Loading Configuration...");
export const config = JSON.parse(fs.readFileSync("./config/config.json", "utf-8"));

const wsd = new WebSocket.Server({
    port: config.ports.websocket
});
console.log();
console.log("Opened Server at localhost:"+config.ports.websocket);

wsd.on("connection", (user: WebSocket) => {
    user.on("message", (msg: string) => {
        const json:PacketInterface = JSON.parse(msg) as PacketInterface;
        switch(json.type) {
            case PacketTypes.HANDSHAKE:
                handleHandshake(user, json.data);
                break;
            default:
        }
    });
});
