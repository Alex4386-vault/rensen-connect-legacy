import WebSocket from "ws";
import { sendPacket, PacketTypes } from "..";
import { truncate } from "fs";
import { getSendSafeCurrentUsers } from "../../Users";

export const currentListeners: WebSocket[] = [];

export function registerListener(conn: WebSocket) {
    currentListeners.push(conn);
    registerListenerSuccess(conn);
    broadcastToListeners(getSendSafeCurrentUsers());
}

export function unregisterListener(conn: WebSocket) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < currentListeners.length; i++) {
        if (currentListeners[i] === conn) {
            currentListeners.splice(i, 1);
        }
    }
}

export function registerListenerSuccess(conn: WebSocket) {
    sendPacket(conn, {
        type: PacketTypes.LISTENER,
        data: {
            success: true,
        },
    });
}

export function broadcastToListeners(data: any) {
    currentListeners.forEach(a => sendPacket(a, { type: PacketTypes.LISTENER, data }));
}
