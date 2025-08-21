"use client";
import React, { useState } from "react";

interface JoinRoomProps {
    onJoin: (roomId: string) => void;
}

const API_URL = process.env.API_URL;

export default function JoinRoom({ onJoin }: JoinRoomProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleJoin = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(API_URL + "/api/livequiz/join_room", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });
            if (!res.ok) throw new Error("Código inválido ou sala não encontrada");
            const data = await res.json();
            if (data && data.id) {
                onJoin(data.id);
            } else {
                setError("Código inválido ou sala não encontrada");
            }
        } catch {
            setError("Erro ao entrar na sala");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Entrar em uma sala</h2>
            <input
                type="text"
                placeholder="Digite o código da sala"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <button
                onClick={handleJoin}
                disabled={!code.trim() || loading}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}
