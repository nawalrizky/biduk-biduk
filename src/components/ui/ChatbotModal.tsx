"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  // Generate new conversation ID on each component mount (page refresh)
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Biduk-Biduk travel assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [showClearModal, setShowClearModal] = useState(false);
  const [userReplyCount, setUserReplyCount] = useState(0);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARACTERS = 500;
  const MAX_USER_REPLIES = 3;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const clearConversation = () => {
    setShowClearModal(true);
  };

  const confirmClearConversation = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! I\'m your Biduk-Biduk travel assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setUserReplyCount(0);
    setHasReachedLimit(false);
    setShowClearModal(false);
  };

  // Function to truncate message if it exceeds character limit
  const truncateMessage = (text: string): string => {
    if (text.length <= MAX_CHARACTERS) {
      return text;
    }
    return text.substring(0, MAX_CHARACTERS) + '...';
  };

  // Function to create direct contact message
  const createDirectContactMessage = (): Message => {
    const contactText = language === 'id' 
      ? `Sepertinya Anda membutuhkan informasi lebih detail. Untuk bantuan langsung dan informasi terkini, silakan hubungi:

📞 Pokdarwis Desir: 0812-1000-2190
📧 Email: bidukbidukpokdarwis@gmail.com

Tim lokal kami akan dengan senang hati membantu Anda merencanakan kunjungan yang sempurna ke Biduk-Biduk!`
      : `It looks like you need more detailed information. For direct assistance and up-to-date information, please contact:

📞 Pokdarwis Desir: 0812-1000-2190
📧 Email: bidukbidukpokdarwis@gmail.com

Our local team will be happy to help you plan the perfect visit to Biduk-Biduk!`;

    return {
      id: (Date.now() + 1).toString(),
      text: contactText,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Check if user has reached the reply limit
    if (hasReachedLimit) {
      // Show direct contact message instead of making API call
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const contactMessage = createDirectContactMessage();
        setMessages(prev => [...prev, contactMessage]);
        setIsTyping(false);
      }, 1000);

      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Increment user reply count
    const newReplyCount = userReplyCount + 1;
    setUserReplyCount(newReplyCount);

    // Check if this is the 4th attempt or higher
    if (newReplyCount > MAX_USER_REPLIES) {
      setHasReachedLimit(true);
      // Show direct contact message instead of API response
      setTimeout(() => {
        const contactMessage = createDirectContactMessage();
        setMessages(prev => [...prev, contactMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // Call the chatbot API
      const response = await fetch('https://73e1b7527fb2.ngrok-free.app/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
        },
        body: JSON.stringify({
          message: currentInput,
          language: language,
          session_id: conversationId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}, body: ${errorText}`);
      }

      const data = await response.json();
      
      // Get the response text and truncate if necessary
      const responseText = data.reply || data.response || data.message || 'Sorry, I couldn\'t process your request right now.';
      const truncatedText = truncateMessage(responseText);
      
      // Create bot message with API response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: truncatedText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      
      if (error instanceof Error) {
        // Handle error silently or log to external service
      }
      
      if (error instanceof TypeError) {
        // Network error detected - possibly CORS or connection issue
      }
      
      // Fallback message on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact our support team.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    'Tell me about destinations',
    'Hotel recommendations',
    'Travel packages',
    'Local cuisine',
  ];

  const handleQuickReply = async (reply: string) => {
    // Check if user has reached the reply limit
    if (hasReachedLimit) {
      // Show direct contact message instead of making API call
      const userMessage: Message = {
        id: Date.now().toString(),
        text: reply,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const contactMessage = createDirectContactMessage();
        setMessages(prev => [...prev, contactMessage]);
        setIsTyping(false);
      }, 1000);

      return;
    }

    // Add user message for quick reply
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Increment user reply count
    const newReplyCount = userReplyCount + 1;
    setUserReplyCount(newReplyCount);

    // Check if this is the 4th attempt or higher
    if (newReplyCount > MAX_USER_REPLIES) {
      setHasReachedLimit(true);
      // Show direct contact message instead of API response
      setTimeout(() => {
        const contactMessage = createDirectContactMessage();
        setMessages(prev => [...prev, contactMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // Call the chatbot API with quick reply
      const response = await fetch('https://73e1b7527fb2.ngrok-free.app/api/chatbot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          message: reply,
          language: language,
          session_id: conversationId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}, body: ${errorText}`);
      }

      const data = await response.json();
      
      // Get the response text and truncate if necessary
      const responseText = data.reply || data.response || data.message || 'Sorry, I couldn\'t process your request right now.';
      const truncatedText = truncateMessage(responseText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: truncatedText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      
      if (error instanceof Error) {
        // Handle error silently or log to external service
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative h-full flex items-end justify-end p-4 pointer-events-none">
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.21 0-2.35-.24-3.41-.68l-.24-.11-2.56.75.75-2.56-.11-.24C5.76 14.35 5 13.21 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
                <path d="M8.5 7.5h7v1h-7zm0 2h7v1h-7zm0 2h5v1h-5z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Travel Assistant</h3>
              <p className="text-xs text-white/80">Online now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Clear Conversation Button */}
            <button
              onClick={clearConversation}
              className="text-white/80 hover:text-white transition-colors p-1"
              title="Clear conversation"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'id')}
              className="bg-white/20 text-white text-sm px-2 py-1 rounded border-none outline-none backdrop-blur-sm"
            >
              <option value="en" className="text-black">EN</option>
              <option value="id" className="text-black">ID</option>
            </select>
            
            <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <pre className="text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4">
          {/* Reply Counter */}
          {userReplyCount > 0 && !hasReachedLimit && (
            <div className="mb-2 text-xs text-gray-500 text-center">
              {language === 'id' 
                ? `Sisa percobaan: ${MAX_USER_REPLIES - userReplyCount} dari ${MAX_USER_REPLIES}`
                : `Remaining attempts: ${MAX_USER_REPLIES - userReplyCount} of ${MAX_USER_REPLIES}`
              }
            </div>
          )}
          
          {/* Reached Limit Message */}
          {hasReachedLimit && (
            <div className="mb-2 text-xs text-orange-600 text-center font-medium">
              {language === 'id' 
                ? '⚠️ Batas percobaan tercapai. Pesan selanjutnya akan diarahkan ke kontak langsung.'
                : '⚠️ Maximum attempts reached. Next messages will be directed to direct contact.'
              }
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border text-black border-gray-300 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[40px] max-h-[120px]"
              disabled={isTyping}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
        </div>
      </div>

      {/* Custom Clear Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowClearModal(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl p-6 mx-4 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Clear Conversation
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to clear this conversation? This action cannot be undone and all messages will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearConversation}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;
