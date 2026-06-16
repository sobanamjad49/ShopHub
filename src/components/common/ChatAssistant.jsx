import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatAssistant.css';

const REPLIES = {
  hello: 'Hi! Welcome to ShopHub. How can I help you shop today?',
  hi: 'Hello! Ask me about products, shipping, or coupons.',
  shipping: 'We offer free shipping on orders over $50. Standard delivery takes 3–5 business days.',
  coupon: 'Try these codes: WELCOME10, SAVE20, FREESHIP, or SHOPHUB15. Spin the wheel on the home page for a surprise!',
  return: 'We have a 30-day money-back guarantee on all products.',
  payment: 'Checkout is secure. We accept all major cards (demo UI only — no real charges).',
  default: 'I can help with shipping, coupons, returns, and product info. What would you like to know?',
};

const getReply = (message) => {
  const lower = message.toLowerCase();
  if (/\b(hi|hello|hey)\b/.test(lower)) return REPLIES.hello;
  if (/ship|deliver|delivery/.test(lower)) return REPLIES.shipping;
  if (/coupon|discount|promo|code/.test(lower)) return REPLIES.coupon;
  if (/return|refund/.test(lower)) return REPLIES.return;
  if (/pay|card|checkout/.test(lower)) return REPLIES.payment;
  return REPLIES.default;
};

const QUICK_PROMPTS = ['Free shipping?', 'Coupon codes?', 'Return policy'];

const ChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m ShopHub AI Assistant. How can I help?' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: getReply(trimmed) }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div>
                <strong>ShopHub AI</strong>
                <span className="chat-status">Online</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
            </div>

            <div className="chat-messages" ref={listRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-quick-prompts">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="chat-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" aria-label="Send">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chat-fab"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.92 }}
        aria-label="Open chat assistant"
      >
        {open ? '✕' : '💬'}
      </motion.button>
    </>
  );
};

export default ChatAssistant;
