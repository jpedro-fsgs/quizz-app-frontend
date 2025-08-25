// Types for Live Quiz endpoints based on OpenAPI (api-docs.json)

export interface JoinRoomDTO {
  code: string;
}

export interface QuizRoomUserDTO {
  id: string; // uuid
  username: string;
  quizRoomId: string; // uuid
}

export interface CreateRoomDTO {
  quizId: string; // uuid
}

export interface QuizSessionRoomDTO {
  id: string; // uuid
  quizId: string; // uuid
  roomCode: string;
}

export interface ErrorDetails {
  timestamp: string; // date-time
  message: string[];
}
