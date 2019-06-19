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
    const userId = registerUser(conn, data.userName);
    sendHandshakeSuccess(conn, userId);
}
