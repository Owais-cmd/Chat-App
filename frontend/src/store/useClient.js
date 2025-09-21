import { create } from 'zustand';
import { persist,createJSONStorage } from "zustand/middleware";

export const useClient = create(persist(
    (set, get) => ({
        name: "",
        setName: (name) => set({ name }),
        roomId: "",
        setRoomId: (roomId) => set({ roomId }),
        socket: null,
        setSocket: (socket) => set({ socket }),
        messages: []
    }),{
      name: "client-storage", // key in sessionStorage
      storage: createJSONStorage(() => sessionStorage),
     
    }
    ));
