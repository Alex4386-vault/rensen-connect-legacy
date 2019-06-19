"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Users_1 = require("../../Users");
function updateUserGameInfo(conn, data) {
    if (Users_1.getUserIndexFromWebSocket(conn) !== -1) {
        Users_1.currentUsers[Users_1.getUserIndexFromWebSocket(conn)].gameInfo = data;
    }
}
exports.updateUserGameInfo = updateUserGameInfo;
function sendGameInfoUpdateSuccess(conn) {
    __1.sendPacket(conn, {
        type: __1.PacketTypes.UPDATEINFO,
        data: {
            success: true,
        },
    });
}
exports.sendGameInfoUpdateSuccess = sendGameInfoUpdateSuccess;
