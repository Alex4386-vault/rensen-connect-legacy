"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
    if (userName === undefined || userName === null || userName === "") {
        userName = "GUEST-" + Common_1.randomDigitGenerator(4);
        console.log("Updated userName to", userName);
    }
    var userId = getNewUserId();
    exports.currentUsers.push({
        userId: userId,
        userName: userName,
        userConnection: conn,
        gameInfo: {
            score: 0,
            lifes: 0,
            power: 0,
            bombs: 0,
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
function getSendSafeCurrentUsers() {
    return (function (_a) {
        var _b = _a, _c = __read(_b, 1), _d = _c[0], userConnection = _d.userConnection, others = __rest(_d, ["userConnection"]);
        return ([__assign({}, others)]);
    })(exports.currentUsers);
}
exports.getSendSafeCurrentUsers = getSendSafeCurrentUsers;
