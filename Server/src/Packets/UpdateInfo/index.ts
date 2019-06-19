import WebSocket from "ws";
import { PacketTypes, sendPacket } from "..";
import { UserGameInfo } from "../../Game";
import { currentUsers, getUserIndexFromWebSocket } from "../../Users";

export function updateUserGameInfo(conn: WebSocket, data: UserGameInfo) {
    if (getUserIndexFromWebSocket(conn) !== -1) {
        currentUsers[getUserIndexFromWebSocket(conn)].gameInfo = data;

    }
}

export function sendGameInfoUpdateSuccess(conn: WebSocket) {
    sendPacket(conn, {
        type: PacketTypes.UPDATEINFO,
        data: {
            success: true,
        },
    });
}
