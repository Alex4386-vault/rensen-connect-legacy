"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Users_1 = require("../../Users");
function sendHandshakeSuccess(conn, userId) {
    __1.sendPacket(conn, {
        type: __1.PacketTypes.HANDSHAKE,
        data: {
            success: true,
            userId: userId
        },
    });
}
exports.sendHandshakeSuccess = sendHandshakeSuccess;
function handleHandshake(conn, data) {
    var userId = Users_1.registerUser(conn, data.userName);
    sendHandshakeSuccess(conn, userId);
}
exports.handleHandshake = handleHandshake;
