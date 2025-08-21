"use client";
import React, { useEffect, useState } from "react";
import ChatRoom from "../../components/livequiz/ChatRoom";
import JoinRoom from "../../components/livequiz/JoinRoom";

const API_URL = process.env.API_URL;

export default function LiveQuizPage() {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await fetch(
                    API_URL + "/api/livequiz/current_room",
                    { credentials: "include" }
                );
                console.log(API_URL);
                if (!res.ok) throw new Error("Erro ao buscar sala atual");
                const data = await res.json();
                if (data && data.id) {
                    setRoomId(data.id);
                } else {
                    setRoomId(null);
                }
            } catch {
                setRoomId(null);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                Carregando...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl p-4 space-y-6">
            {roomId ? (
                <ChatRoom roomId={roomId} />
            ) : (
                <JoinRoom onJoin={setRoomId} />
            )}
        </div>
    );
}
