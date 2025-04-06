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
  const [searchTerm, setSearchTerm] = useState('');

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
    if (isMobileView) setShowSidebar(false);
  };

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const activeChatUser = users.find(u => u.id === activeChat);
  const filteredUsers = users.filter(u => u.id !== user?.id && u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className={`transition-all duration-300 shadow-md bg-white border-r border-gray-200 ${isMobileView ? 'w-full' : 'w-72'} flex flex-col`}>
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">DevConnect 💬</h2>
            </div>

            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-y-auto flex-grow">
              {filteredUsers.map((chatUser) => (
                <button
                  key={chatUser.id}
                  className={`w-full text-left px-4 py-3 flex items-center hover:bg-brand-50 transition-colors ${
                    activeChat === chatUser.id ? 'bg-brand-100' : ''
                  }`}
                  onClick={() => handleSelectChat(chatUser.id)}
                >
                  <div className="relative">
                    <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-semibold border border-brand-300">
                      {chatUser.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {chatUser.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm text-gray-900">{chatUser.name}</p>
                    <p className="text-xs text-gray-500">{chatUser.online ? 'Online' : 'Offline'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        {!showSidebar && activeChat && activeChatUser && (
          <div className="flex-1 relative">
            {isMobileView && (
              <button
                onClick={toggleSidebar}
                className="absolute top-2 left-2 bg-gray-100 text-gray-700 px-4 py-1 rounded-md text-sm shadow-md"
              >
                ← Back
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
          <div className="flex-1 flex items-center justify-center bg-gray-100 text-center px-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">No conversation selected</h3>
              <p className="text-gray-500 text-sm">Choose a developer from the sidebar to start chatting</p>
              {isMobileView && (
                <button
                  onClick={toggleSidebar}
                  className="mt-4 bg-brand-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-brand-700"
                >
                  Show Contacts
                </button>
              )}
            </div>
          </div>
        )}

        {/* Empty State for Desktop */}
        {showSidebar && !activeChat && !isMobileView && (
          <div className="flex-1 flex items-center justify-center bg-gray-100 text-center px-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Welcome to DevConnect Chat</h3>
              <p className="text-gray-500 text-sm">Select a developer from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
