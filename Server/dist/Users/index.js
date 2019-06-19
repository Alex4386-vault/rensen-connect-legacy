"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../Common");
var Game_1 = require("../Game");
exports.currentUsers = [];
function getNewUserId() {
    var i = 1;
    // tslint:disable-next-line: prefer-for-of
    for (var j = 0; j < exports.currentUsers.length; j++) {
        if (exports.currentUsers[j].userId === i) {
            i++;
        }
        else {
            break;
        }
    }
    return i;
}
exports.getNewUserId = getNewUserId;
function registerUser(conn, userName) {
    if (userName === undefined || userName === null) {
        userName = "GUEST-" + Common_1.randomDigitGenerator(4);
    }
    var userId = getNewUserId();
    exports.currentUsers.push({
        userId: userId,
        userName: userName,
        userConnection: conn,
        gameInfo: {
            score: 0,
            life: 0,
            power: 0,
            bomb: 0,
            difficulty: Game_1.GameDifficulty.EASY,
        },
    });
    return userId;
}
exports.registerUser = registerUser;
function getUserIndexFromWebSocket(conn) {
    var index = 0;
    for (var i = 0; i < exports.currentUsers.length; i++) {
        if (exports.currentUsers[i].userConnection === conn) {
            return i;
        }
    }
    return -1;
}
exports.getUserIndexFromWebSocket = getUserIndexFromWebSocket;
function unregisterUser(conn) {
    var index = getUserIndexFromWebSocket(conn);
    if (index === -1) {
        return -1;
    }
    else {
        exports.currentUsers.splice(index, 1);
    }
    return 0;
}
exports.unregisterUser = unregisterUser;
