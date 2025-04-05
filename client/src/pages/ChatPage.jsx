import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { user } = useAuth();
  const { activeChat, setActiveChat, messages, users, sendMessage } = useChat();
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(!activeChat);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [user, navigate, activeChat]);

  const handleSelectChat = (userId) => {
    setActiveChat(userId);
    if (isMobileView) {
      setShowSidebar(false);
    }
  };

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const activeChatUser = users.find(u => u.id === activeChat);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex">
        {/* Sidebar */}
        {showSidebar && (
          <div className={`bg-white border-r border-gray-200 ${isMobileView ? 'w-full' : 'w-64'}`}>
            <div className="p-4 border-b">
              <h2 className="font-medium">Messages</h2>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-64px-57px)]">
              {users.filter(u => u.id !== user?.id).map((chatUser) => (
                <button
                  key={chatUser.id}
                  className={`w-full text-left p-4 border-b flex items-center hover:bg-gray-50 ${
                    activeChat === chatUser.id ? 'bg-brand-50' : ''
                  }`}
                  onClick={() => handleSelectChat(chatUser.id)}
                >
                  <div className="relative">
                    <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold">
                      {chatUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {chatUser.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{chatUser.name}</p>
                    <p className="text-xs text-gray-500">
                      {chatUser.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        {!showSidebar && activeChat && activeChatUser && (
          <div className="flex-1">
            {isMobileView && (
              <button 
                onClick={toggleSidebar} 
                className="bg-gray-100 text-gray-700 px-4 py-2 m-2 rounded-md text-sm"
              >
                ← Back to contacts
              </button>
            )}
            <ChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              receiverId={activeChat}
              receiverName={activeChatUser.name}
            />
          </div>
        )}

        {/* Empty State for Mobile */}
        {!activeChat && !showSidebar && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-500">
                Choose a developer from the sidebar to start chatting
              </p>
              {isMobileView && (
                <button 
                  onClick={toggleSidebar} 
                  className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Show Contacts
                </button>
              )}
            </div>
          </div>
        )}

        {/* Empty State for Desktop */}
        {showSidebar && !activeChat && !isMobileView && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to DevConnect Chat</h3>
              <p className="text-gray-500">
                Select a developer from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
