import { create } from 'zustand';//zustand is a small, fast and scaleable bear-bones state-management library for React that has a very simple API (hooks only) and small bundle size (1.5kB minified and gzipped). It is a great alternative to Redux, Recoil, and MobX. 

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;
