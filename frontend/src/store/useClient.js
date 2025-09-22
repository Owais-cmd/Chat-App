import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";
import { io } from "socket.io-client"

const SERVER_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"


export const useClient = create(persist(
  (set, get) => ({
    name: "",
    setName: (name) => set({ name }),
    roomId: "",
    setRoomId: (roomId) => set({ roomId }),
    socket: null,
    setSocket: (socket) => set({ socket }),
    connectSocket: (name, roomId) => {
      const existingSocket = get().socket;
      const sameIdentity = get().name === name && get().roomId === roomId;

      if (existingSocket && sameIdentity && existingSocket.connected) {
        return;
      }

      if (existingSocket) {
        try { existingSocket.off('receive-message'); } catch {}
        existingSocket.disconnect();
      }

      const socket = io(SERVER_URL, {
        query: { name, roomId }
      });
      set({ socket,name,roomId});

      socket.on('receive-message', ({ message, senderName }) => {
        set({ messages: [...get().messages, { id: Date.now(), text: message, user: senderName }] });
      });
    },
    disconnectSocket: () => {
      const socket = get().socket;
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      }
    },
    messages: [],
    setMessages: (messages) => set({ messages: [...get().messages, ...messages] }),
    sendMessage: (message) => {
      const socket = get().socket;
      const name = get().name;
      if (!socket || !message || !message.trim()) return;
      const senderName = name
      // Optimistically add the sender's own message to the chat
      set({ messages: [...get().messages, { id: Date.now(), text: message, user: name }] });

      // Send message to server
      socket.emit('send-message', { message ,senderName});
    }
  }), {
  name: "client-storage", // key in sessionStorage
  storage: createJSONStorage(() => sessionStorage),
  // Only persist serializable values
  partialize: (state) => ({
    name: state.name,
    roomId: state.roomId,
    messages: state.messages,
  }),

}
));
