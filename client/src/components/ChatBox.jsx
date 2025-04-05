import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ChatBox = ({ messages, onSendMessage, receiverId, receiverName }) => {
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const randomShowTyping = () => {
      if (Math.random() > 0.7) {
        setIsTyping(true);

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    };

    const interval = setInterval(randomShowTyping, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const chatMessages = messages.filter(
    (msg) =>
      (msg.senderId === user?.id && msg.receiverId === receiverId) ||
      (msg.senderId === receiverId && msg.receiverId === user?.id)
  );

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const groupedMessages = {};
  chatMessages.forEach((message) => {
    const date = formatDate(message.timestamp);
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="flex flex-col h-[calc(100vh-64px-2rem)] bg-gray-50 rounded-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
        <Link to={`/profile/${receiverId}`} className="flex items-center hover:bg-gray-50 p-1 rounded-md">
          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-medium mr-3">
            {receiverName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-medium">{receiverName}</h3>
            <p className="text-xs text-gray-500">{isTyping ? 'Typing...' : 'Online'}</p>
          </div>
        </Link>

        <Link to={`/profile/${receiverId}`} className="text-sm text-brand-600 hover:underline">
          View Profile
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {Object.keys(groupedMessages).length > 0 ? (
          Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date} className="mb-4">
              <div className="flex justify-center mb-4">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {date}
                </span>
              </div>

              {msgs.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.senderId === user?.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.senderId !== user?.id && (
                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-2 mt-1">
                      {receiverName.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.senderId === user?.id
                        ? 'bg-brand-500 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <div className="break-words">{message.content}</div>
                    <div
                      className={`text-xs mt-1 text-right ${
                        message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center flex-col">
            <div className="text-6xl mb-4">👋</div>
            <p className="text-gray-500 mb-2">No messages yet with {receiverName}</p>
            <p className="text-gray-400 text-sm">Start the conversation!</p>
          </div>
        )}

        {isTyping && (
          <div className="flex mb-4">
            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mr-2">
              {receiverName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-3 bg-white">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-lg mx-2 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Type a message..."
          />

          <button
            type="button"
            className="p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none mr-2"
          >
            <Smile size={18} />
          </button>

          <button
            type="submit"
            className="bg-brand-500 text-white p-2 rounded-full hover:bg-brand-600 flex items-center justify-center"
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
