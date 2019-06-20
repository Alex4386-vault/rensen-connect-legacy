import WebSocket from "ws";
import { ranks } from "../..";
import { UserGameInfo } from "../../Game";
import { currentUsers, getSendSafeCurrentUsers, getUserIndexFromWebSocket } from "../../Users";
import { broadcastToListeners } from "../Listeners";
import { sendGameInfoUpdateSuccess } from "../UpdateInfo";

export interface RankFormat {
    userName: string;
    gameInfo: UserGameInfo;
}

export function registerRank(conn: WebSocket) {
    if (getUserIndexFromWebSocket(conn) !== -1) {
        ranks.push({
            userName: currentUsers[getUserIndexFromWebSocket(conn)].userName,
            gameInfo: currentUsers[getUserIndexFromWebSocket(conn)].gameInfo,
        });
        broadcastToListeners({ current: getSendSafeCurrentUsers(), ranks });
    }
}
