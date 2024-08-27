// websocket.ts

export function createWebSocketConnection(conversationId: string) {
  const socket = new WebSocket(`ws://localhost:8000/ws/${conversationId}/`);

  socket.onopen = () => console.log("WebSocket connection opened");
  socket.onclose = () => console.log("WebSocket connection closed");

  return socket;
}
