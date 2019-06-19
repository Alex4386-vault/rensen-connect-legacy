import express from "express";
import { phpify } from "express-phpify";
import expressWs from "express-ws";
import fs from "fs";
import path from "path";
import WebSocket from "ws";
import { PacketInterface, PacketTypes } from "./Packets";
import { handleHandshake, sendHandshakeSuccess } from "./Packets/Handshake";
import { registerListener, unregisterListener } from "./Packets/Listeners";
import { updateUserGameInfo } from "./Packets/UpdateInfo";
import { currentUsers, getUserIndexFromWebSocket, unregisterUser } from "./Users";

console.log("RENSEN-CONNECT");
console.log("Copyright (c) Alex4386 and Rensen-Connect Contributors");
console.log("This software is distributed under HRPL and MIT");
console.log();
console.log("Loading Configuration...");
export const config = JSON.parse(fs.readFileSync("./config/config.json", "utf-8"));

const appWs = expressWs(express());
const app = appWs.app;

/*
const wsd = new WebSocket.Server({
    port: config.ports.websocket,
});
*/

phpify(app);

app.use(express.static(path.join(__dirname, "../web")));
// app.disable("content-security-policy");

app.ws("/", (wsd, req) => {
    wsd.on("connection", (user: WebSocket) => {
        user.on("message", (msg: string) => {
            const json: PacketInterface = JSON.parse(msg) as PacketInterface;
            switch (json.type) {
                case PacketTypes.HANDSHAKE:
                    handleHandshake(user, json.data);
                    break;
                case PacketTypes.UPDATEINFO:
                    updateUserGameInfo(user, json.data);
                    break;
                case PacketTypes.LISTENER:
                    registerListener(user);
                default:
            }
        });

        user.on("close", () => {
            if (getUserIndexFromWebSocket(user) !== -1) {
                console.log("Unregistering userId:", currentUsers[getUserIndexFromWebSocket(user)].userId);
                unregisterUser(user);
            }
            unregisterListener(user);
        });
    });
});

app.listen(config.ports.websocket);
console.log("Opened Server at localhost:" + config.ports.websocket);
console.log();
