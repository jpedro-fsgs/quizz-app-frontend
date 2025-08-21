"use client";
import React, { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";

export type MessageType = "CHAT" | "JOIN" | "LEAVE";
export type MessagePayload = {
    sender: string;
    content: string;
    type: MessageType;
    timestamp: string;
};

interface ChatRoomProps {
    roomId: string;
}

export default function ChatRoom({ roomId }: ChatRoomProps) {
    const [username, setUsername] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const stompClientRef = useRef<Client | null>(null);

    const handleIncoming = (frame: IMessage) => {
        const { body } = frame;
        const payload: MessagePayload = JSON.parse(body);
        setMessages((prev) => [...prev, payload]);
    };

    const connect = () => {
        if (!username.trim()) return;
        if (stompClientRef.current?.active || stompClientRef.current?.connected) return;
        const client = new Client({
            brokerURL: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            onConnect: () => {
                setIsConnected(true);
                client.subscribe(`/topic/quiz/${roomId}`, handleIncoming);
                const payload: MessagePayload = {
                    sender: username,
                    content: "",
                    type: "JOIN",
                    timestamp: new Date().toISOString(),
                };
                client.publish({
                    destination: "/app/register",
                    body: JSON.stringify(payload),
                });
            },
            onStompError: (frame) => {
                console.error("Erro STOMP:", frame.headers["message"], frame.body);
            },
            onWebSocketError: (event) => {
                console.error("Erro WebSocket:", event);
            },
            onDisconnect: () => {
                setIsConnected(false);
            },
        });
        stompClientRef.current = client;
        client.activate();
    };

    const sendMessage = () => {
        const client = stompClientRef.current;
        if (!client?.connected) return;
        const text = message.trim();
        if (!text) return;
        const payload: MessagePayload = {
            sender: username,
            content: text,
            type: "CHAT",
            timestamp: new Date().toISOString(),
        };
        client.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(payload),
        });
        setMessage("");
    };

    useEffect(() => {
        return () => {
            stompClientRef.current?.deactivate();
        };
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Sala {roomId}</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                    type="text"
                    placeholder="Seu username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isConnected}
                />
                <button
                    onClick={connect}
                    disabled={!username.trim() || isConnected}
                    className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    {isConnected ? "Conectado" : "Conectar"}
                </button>
            </div>
            <div className="space-y-3">
                <div className="h-64 overflow-y-auto rounded border p-3 bg-white">
                    {messages.length === 0 ? (
                        <p className="text-sm text-gray-500">Nenhuma mensagem ainda.</p>
                    ) : (
                        <ul className="space-y-1">
                            {messages.map((msg, idx) => (
                                <li key={idx} className="text-sm flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{msg.sender}</span>
                                        <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                        <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{msg.type}</span>
                                    </div>
                                    <div className="ml-2">{msg.content}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={isConnected ? "Escreva sua mensagem" : "Conecte-se para enviar mensagens"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                        disabled={!isConnected}
                        className="flex-1 rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!isConnected || !message.trim()}
                        className="rounded bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
