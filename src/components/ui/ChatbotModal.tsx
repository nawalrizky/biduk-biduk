"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.bidukbiduk.com/api';

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
  const currentLanguage = useLanguage();
  

  const getApiLanguage = (lang: string): string => {
    const mapping: { [key: string]: string } = {
      'en': 'en',
      'id': 'id',
      'ar': 'ar',
      'zh': 'zh',
      'fr': 'fr',
      'es': 'es'
    };
    return mapping[lang] || 'en';
  };


  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `🌍 Welcome to Biduk-Biduk Travel Assistant! / Selamat datang di Asisten Perjalanan Biduk-Biduk!

I can help you in multiple languages. Please use your preferred language such as :
• 🇺🇸 English
• 🇮🇩 Bahasa Indonesia  
• 🇸🇦 العربية (Arabic)
• 🇨🇳 中文 (Chinese)
• 🇫🇷 Français (French)
• 🇪🇸 Español (Spanish)

How can I assist you with your Biduk-Biduk travel plans today?
`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      text: `🌍 Welcome to Biduk-Biduk Travel Assistant! / Selamat datang di Asisten Perjalanan Biduk-Biduk!

I can help you in multiple languages. Please select your preferred language using the language button in the top-left corner:
• 🇺🇸 English
• 🇮🇩 Bahasa Indonesia  
• 🇸🇦 العربية (Arabic)
• 🇨🇳 中文 (Chinese)
• 🇫🇷 Français (French)
• 🇪🇸 Español (Spanish)

How can I assist you with your Biduk-Biduk travel plans today?
`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setShowClearModal(false);
  };



  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;


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

    try {
  
      const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          language: getApiLanguage(currentLanguage),
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}, body: ${errorText}`);
      }

      const data = await response.json();
      

      const responseText = data.reply || data.response || data.message || 'Sorry, I couldn\'t process your request right now.';
      
  
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
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

  const quickReplies = (() => {
    switch (currentLanguage) {
      case 'id':
        return [
          'Ceritakan tentang destinasi',
          'Rekomendasi hotel',
          'Paket wisata',
          'Kuliner lokal',
        ];
      case 'ar':
        return [
          'أخبرني عن الوجهات',
          'توصيات الفنادق',
          'حزم السفر',
          'المأكولات المحلية',
        ];
      case 'zh':
        return [
          '告诉我目的地信息',
          '酒店推荐',
          '旅行套餐',
          '当地美食',
        ];
      case 'fr':
        return [
          'Parlez-moi des destinations',
          'Recommandations d\'hôtels',
          'Forfaits voyage',
          'Cuisine locale',
        ];
      case 'es':
        return [
          'Cuéntame sobre destinos',
          'Recomendaciones de hoteles',
          'Paquetes de viaje',
          'Cocina local',
        ];
      default: // 'en'
        return [
          'Tell me about destinations',
          'Hotel recommendations',
          'Travel packages',
          'Local cuisine',
        ];
    }
  })();

  const handleQuickReply = async (reply: string) => {

    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: reply,
          language: getApiLanguage(currentLanguage),
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}, body: ${errorText}`);
      }

      const data = await response.json();
      
      
      const responseText = data.reply || data.response || data.message || 'Sorry, I couldn\'t process your request right now.';
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      
      if (error instanceof Error) {
    
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
    <div 
      className="fixed inset-0 z-50" 
      onWheel={(e) => e.preventDefault()}
    >
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative h-full flex items-end justify-end p-4 pointer-events-none">
        {/* Glassmorphism Modal */}
        <div className="relative bg-black/20  backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
        {/* Simplified Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Biduk-Biduk Assistant</h3>
              <p className="text-white/60 text-xs">Ask me anything</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Clear Conversation Button */}
            <button
              onClick={clearConversation}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
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
            
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain custom-scrollbar"
          onWheel={(e) => {
            // Prevent parent scrolling when scrolling within chat area
            e.stopPropagation();
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg backdrop-blur-sm border ${
                  message.sender === 'user'
                    ? 'bg-transparent text-white font-medium border-white/40 rounded-br-none'
                    : 'bg-transparent text-white font-medium border-white/30 rounded-bl-none'
                }`}
              >
                <pre className="text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                <p className="text-xs mt-1 text-white">
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
              <div className="bg-white/60 backdrop-blur-sm border border-white/30 text-gray-800 rounded-lg rounded-bl-none p-3">
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
            <p className="text-xs text-white/80 mb-2">
              {(() => {
                switch (currentLanguage) {
                  case 'id': return 'Pertanyaan cepat:';
                  case 'ar': return 'أسئلة سريعة:';
                  case 'zh': return '快速问题：';
                  case 'fr': return 'Questions rapides:';
                  case 'es': return 'Preguntas rápidas:';
                  default: return 'Quick questions:';
                }
              })()}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white/90 border border-white/30 px-3 py-1 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4">
          
          <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={(() => {
                switch (currentLanguage) {
                  case 'id': return 'Ketik pesan Anda...';
                  case 'ar': return 'اكتب رسالتك...';
                  case 'zh': return '输入您的消息...';
                  case 'fr': return 'Tapez votre message...';
                  case 'es': return 'Escribe tu mensaje...';
                  default: return 'Type your message...';
                }
              })()}
              className="flex-1 bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 resize-none min-h-[40px] max-h-[120px]"
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
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 disabled:bg-white/40 disabled:cursor-not-allowed text-gray-700 border border-white/40 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-5 h-5 rotate-90"
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
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      
      `}</style>
    </div>
  );
};

export default ChatbotModal;
