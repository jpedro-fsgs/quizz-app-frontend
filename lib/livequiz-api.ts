// Funções utilitárias para consumir os endpoints de livequiz
import type {
  JoinRoomDTO,
  QuizRoomUserDTO,
  CreateRoomDTO,
  QuizSessionRoomDTO,
  ErrorDetails
} from "../interfaces/livequiz";

const API_URL = process.env.API_URL;

export async function joinLiveQuizRoom(payload: JoinRoomDTO): Promise<QuizRoomUserDTO> {
  const res = await fetch(API_URL + "/api/livequiz/join_room", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err: ErrorDetails = await res.json();
    throw new Error(err.message?.[0] || "Erro ao entrar na sala");
  }
  return res.json();
}

export async function createLiveQuizRoom(payload: CreateRoomDTO): Promise<QuizSessionRoomDTO> {
  const res = await fetch(API_URL + "/api/livequiz/create_room", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err: ErrorDetails = await res.json();
    throw new Error(err.message?.[0] || "Erro ao criar sala");
  }
  return res.json();
}

export async function getAllLiveQuizRooms(): Promise<QuizSessionRoomDTO[]> {
  const res = await fetch(API_URL + "/api/livequiz/rooms", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erro ao buscar salas");
  return res.json();
}

export async function getCurrentLiveQuizRoom(): Promise<QuizRoomUserDTO | null> {
  const res = await fetch(API_URL + "/api/livequiz/current_room", {
    credentials: "include",
  });
  if (res.status === 204) return null;
  if (!res.ok) throw new Error("Erro ao buscar sala atual");
  return res.json();
}
