"use client";

import { useState } from "react";
import Image from "next/image";
import ChatbotModal from "./ChatbotModal";

const ChatbotButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleButtonClick}
        className={`fixed bottom-6 right-6 z-50 bg-black/20 backdrop-blur-md border-white/30 border text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${
          isModalOpen ? "rounded-full px-6 py-2" : "rounded-full p-4"
        }`}
        aria-label="Open chatbot"
      >
        {/* Chat Icon */}
        <div className="flex items-center justify-center">
          {!isModalOpen ? (
            <div className="flex items-center gap-3 whitespace-nowrap min-w-0">
              <Image
                src="/icon/chat.svg"
                alt="Chat Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
              <span className="text-white font-semibold text-base flex-shrink-0">
                Ask Us Anything!
              </span>
              <Image
                src="/icon/arrow_up.svg"
                alt="Arrow Up Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
            </div>
          ) : (
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-25"></div>
      </button>

      {/* Tooltip */}
      {!isModalOpen && (
        <div className="fixed bottom-6 right-20 z-40 bg-black text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Need help? Chat with us!
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
        </div>
      )}

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ChatbotButton;
