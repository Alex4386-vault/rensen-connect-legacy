"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.currentListeners = [];
function registerListener(conn) {
    exports.currentListeners.push(conn);
    registerListenerSuccess(conn);
}
exports.registerListener = registerListener;
function unregisterListener(conn) {
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < exports.currentListeners.length; i++) {
        if (exports.currentListeners[i] === conn) {
            exports.currentListeners.splice(i, 1);
        }
    }
}
exports.unregisterListener = unregisterListener;
function registerListenerSuccess(conn) {
    __1.sendPacket(conn, {
        type: __1.PacketTypes.LISTENER,
        data: {
            success: true,
        },
    });
}
exports.registerListenerSuccess = registerListenerSuccess;
function broadcastToListeners(data) {
    exports.currentListeners.forEach(function (a) { return __1.sendPacket(a, { type: __1.PacketTypes.LISTENER, data: data }); });
}
exports.broadcastToListeners = broadcastToListeners;
