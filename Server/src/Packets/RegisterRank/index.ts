import fs from "fs";
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
        const a = currentUsers[getUserIndexFromWebSocket(conn)];
        ranks.push({
            userName: a.userName,
            gameInfo: {
                score: a.gameInfo.score,
                bombs: a.gameInfo.bombs,
                power: a.gameInfo.power,
                lifes: a.gameInfo.lifes,
                difficulty: a.gameInfo.difficulty,
            },
        });
        broadcastToListeners({ current: getSendSafeCurrentUsers(), ranks });
        fs.writeFileSync("./config/ranks.json", JSON.stringify(ranks), {
            encoding: "utf8",
        });
    }
}
