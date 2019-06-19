"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../Common");
exports.currentUsers = [];
function getNewUserId() {
    var i = 1;
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
        userConnection: conn
    });
    return userId;
}
exports.registerUser = registerUser;
function getUserIdFromWebSocket(conn) {
    var index = 0;
    for (var i = 0; i < exports.currentUsers.length; i++) {
        if (exports.currentUsers[i].userConnection === conn) {
            return i;
        }
    }
    return -1;
}
exports.getUserIdFromWebSocket = getUserIdFromWebSocket;
function unregisterUser(conn) {
    var index = getUserIdFromWebSocket(conn);
    if (index === -1) {
        return -1;
    }
    else {
        exports.currentUsers.splice(index, 1);
    }
    return 0;
}
exports.unregisterUser = unregisterUser;
