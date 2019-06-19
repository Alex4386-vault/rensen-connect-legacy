import WebSocket from "ws";
import { sendPacket, PacketTypes } from "..";
import { registerUser } from "../../Users";

interface HandshakePacket {
    userName: string
}

export function sendHandshakeSuccess(conn: WebSocket, userId: number) {
    
    sendPacket(conn, {
        type: PacketTypes.HANDSHAKE,
        data: {
            success: true,
            userId
        },
    })
}

export function handleHandshake(conn: WebSocket, data: HandshakePacket) {
    console.log("Handshake Request! userName:",data.userName);
    const userId = registerUser(conn, data.userName);
    console.log("Handshake Success! userId:",userId)
    sendHandshakeSuccess(conn, userId);
}
