import WebSocket from "ws";
import { sendPacket, PacketTypes } from "..";

export const currentListeners: WebSocket[] = [];

export function registerListener(conn: WebSocket) {
    currentListeners.push(conn);
}

export function unregisterListener(conn: WebSocket) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < currentListeners.length; i++) {
        if (currentListeners[i] === conn) {
            currentListeners.splice(i, 1);
        }
    }
}

export function broadcastToListeners(data: any) {
    currentListeners.forEach(a => sendPacket(a, { type: PacketTypes.LISTENER, data }));
}
