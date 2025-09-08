"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import ChatbotModal from "./ChatbotModal";

const ChatbotButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // You need to replace this with your actual reCAPTCHA site key
  const RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Test key

  const handleButtonClick = () => {
    if (!isVerified) {
      setShowRecaptcha(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setIsVerified(true);
      setShowRecaptcha(false);
      setIsModalOpen(true);
    }
  };

  const handleRecaptchaExpired = () => {
    setIsVerified(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeRecaptcha = () => {
    setShowRecaptcha(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
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
      {!isModalOpen && !showRecaptcha && (
        <div className="fixed bottom-6 right-20 z-40 bg-black text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Need help? Chat with us!
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
        </div>
      )}

      {/* reCAPTCHA Modal */}
      {showRecaptcha && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeRecaptcha}
          />
          <div className="relative bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Verify You&apos;re Human
              </h3>
              <button
                onClick={closeRecaptcha}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
            <p className="text-gray-600 mb-4">
              Please complete the verification to access our chat assistant.
            </p>
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
              />
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ChatbotButton;
