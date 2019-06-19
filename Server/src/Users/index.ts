import WebSocket from "ws";
import { randomDigitGenerator } from "../Common";

export const currentUsers:Array<UserDataFormat> = [];

interface UserDataFormat {
    userId: number,
    userName: string,
    userConnection: WebSocket
}

export function getNewUserId():number {
    let i = 1;
    for (let j = 0; j < currentUsers.length; j++) {
        if (currentUsers[j].userId === i) {
            i++;
        } else {
            break;
        }
    }
    return i;
}

export function registerUser(conn: WebSocket, userName: string):number {
    if (userName === undefined || userName === null) { userName = "GUEST-"+randomDigitGenerator(4); }
    const userId = getNewUserId();
    currentUsers.push({
        userId,
        userName,
        userConnection: conn
    });
    return userId;
}

export function getUserIdFromWebSocket(conn: WebSocket): number {
    let index = 0;
    for (let i = 0; i < currentUsers.length; i++) {
        if (currentUsers[i].userConnection === conn) {
            return i;
        }
    }
    return -1;
}

export function unregisterUser(conn: WebSocket) {
    const index = getUserIdFromWebSocket(conn);
    if (index === -1) {
        return -1;
    } else {
        currentUsers.splice(index, 1);
    }
    return 0;
}
