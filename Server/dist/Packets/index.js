"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PacketTypes;
(function (PacketTypes) {
    PacketTypes["HANDSHAKE"] = "handshake";
    PacketTypes["UPDATEINFO"] = "updateInfo";
})(PacketTypes = exports.PacketTypes || (exports.PacketTypes = {}));
function sendPacket(conn, packet) {
    conn.send(JSON.stringify(packet));
}
exports.sendPacket = sendPacket;
