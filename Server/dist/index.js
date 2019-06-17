"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var fs_1 = __importDefault(require("fs"));
console.log("Loading Configuration...");
exports.config = JSON.parse(fs_1.default.readFileSync("./config/config.json", "utf-8"));
var wsd = new ws_1.default.Server({
    port: exports.config.ports.websocket
});
wsd.on("connection", function (user) {
    user.send("hello");
});
