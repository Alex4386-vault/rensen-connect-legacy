"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Users_1 = require("../../Users");
var Listeners_1 = require("../Listeners");
function updateUserGameInfo(conn, data) {
    if (Users_1.getUserIndexFromWebSocket(conn) !== -1) {
        console.log("Updating userId", Users_1.currentUsers[Users_1.getUserIndexFromWebSocket(conn)].userId + ":");
        Object.assign(Users_1.currentUsers[Users_1.getUserIndexFromWebSocket(conn)].gameInfo, data);
        var dope = Users_1.currentUsers[Users_1.getUserIndexFromWebSocket(conn)].gameInfo;
        console.log("Score:", dope.score, "at Difficulty", dope.difficulty);
        console.log("Lifes:", dope.lifes, ", Power:", dope.power, ", Bombs:", dope.bombs);
        Listeners_1.broadcastToListeners(Users_1.getSendSafeCurrentUsers());
        sendGameInfoUpdateSuccess(conn);
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
