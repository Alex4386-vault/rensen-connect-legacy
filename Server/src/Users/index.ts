import WebSocket from "ws";
import { randomDigitGenerator } from "../Common";
import { GameDifficulty, UserGameInfo } from "../Game";

export const currentUsers: UserDataFormat[] = [];

interface UserDataFormat {
    userId: number;
    userName: string;
    userConnection: WebSocket;
    gameInfo: UserGameInfo;
}

export function getNewUserId(): number {
    let i = 1;

    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < currentUsers.length; j++) {
        if (currentUsers[j].userId === i) {
            i++;
        } else {
            break;
        }
    }
    return i;
}

export function registerUser(conn: WebSocket, userName: string): number {
    if (userName === undefined || userName === null || userName === "") {
         userName = "GUEST-" + randomDigitGenerator(4);
         console.log("Updated userName to", userName);
    }
    const userId = getNewUserId();
    currentUsers.push({
        userId,
        userName,
        userConnection: conn,
        gameInfo: {
            score: 0,
            lifes: 0,
            power: 0,
            bombs: 0,
            difficulty: GameDifficulty.EASY,
        },
    });
    return userId;
}

export function getUserIndexFromWebSocket(conn: WebSocket): number {
    const index = 0;
    for (let i = 0; i < currentUsers.length; i++) {
        if (currentUsers[i].userConnection === conn) {
            return i;
        }
    }
    return -1;
}

export function unregisterUser(conn: WebSocket) {
    const index = getUserIndexFromWebSocket(conn);
    if (index === -1) {
        return -1;
    } else {
        currentUsers.splice(index, 1);
    }
    return 0;
}
