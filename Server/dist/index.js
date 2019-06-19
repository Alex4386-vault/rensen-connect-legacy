"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var fs_1 = __importDefault(require("fs"));
var Handshake_1 = require("./Packets/Handshake");
var Packets_1 = require("./Packets");
console.log("RENSEN-CONNECT");
console.log("Copyright (c) Alex4386 and Rensen-Connect Contributors");
console.log("This software is distributed under HRPL and MIT");
console.log();
console.log("Loading Configuration...");
exports.config = JSON.parse(fs_1.default.readFileSync("./config/config.json", "utf-8"));
var wsd = new ws_1.default.Server({
    port: exports.config.ports.websocket
});
console.log();
console.log("Opened Server at localhost:" + exports.config.ports.websocket);
wsd.on("connection", function (user) {
    user.on("message", function (msg) {
        var json = JSON.parse(msg);
        switch (json.type) {
            case Packets_1.PacketTypes.HANDSHAKE:
                Handshake_1.handleHandshake(user, json.data);
                break;
            default:
        }
    });
});
