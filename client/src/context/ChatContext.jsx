import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext(null);

// Mock data for development
const mockUsers = [
  {
    id: 1,
    name: 'Jane Smith',
    online: true,
  },
  {
    id: 2,
    name: 'John Doe',
    online: true,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    online: false,
  }
];

const mockMessages = [
  {
    id: '1',
    senderId: 1,
    receiverId: 2,
    content: "Hey, how's your React project going?",
    timestamp: new Date('2023-06-10T08:30:00'),
  },
  {
    id: '2',
    senderId: 2,
    receiverId: 1,
    content: "It's going well! Just working on some component optimizations.",
    timestamp: new Date('2023-06-10T08:32:00'),
  },
  {
    id: '3',
    senderId: 1,
    receiverId: 2,
    content: 'Nice! Do you need any help with the backend integration?',
    timestamp: new Date('2023-06-10T08:35:00'),
  }
];

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(mockMessages);
  const [users, setUsers] = useState(mockUsers);

  const sendMessage = (content) => {
    if (!activeChat || !user) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: activeChat,
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ activeChat, messages, users, setActiveChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
