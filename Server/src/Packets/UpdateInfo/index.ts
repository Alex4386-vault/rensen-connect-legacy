import WebSocket from "ws";
import { PacketTypes, sendPacket } from "..";
import { ranks } from "../..";
import { UserGameInfo } from "../../Game";
import { currentUsers, getSendSafeCurrentUsers, getUserIndexFromWebSocket } from "../../Users";
import { broadcastToListeners } from "../Listeners";

export function updateUserGameInfo(conn: WebSocket, data: UserGameInfo) {
    if (getUserIndexFromWebSocket(conn) !== -1) {
        console.log("Updating userId", currentUsers[getUserIndexFromWebSocket(conn)].userId + ":");

        Object.assign(currentUsers[getUserIndexFromWebSocket(conn)].gameInfo, data);

        const dope = currentUsers[getUserIndexFromWebSocket(conn)].gameInfo;

        console.log("Score:", dope.score, "at Difficulty", dope.difficulty);
        console.log("Lifes:", dope.lifes, ", Power:", dope.power, ", Bombs:", dope.bombs);

        broadcastToListeners({ current: getSendSafeCurrentUsers(), ranks });
        sendGameInfoUpdateSuccess(conn);
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
