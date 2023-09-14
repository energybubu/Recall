import React, { useEffect, useRef } from 'react';

const ScrollableWindow = ({ className, topic, messages, renderMessage }) => {
  const scrollableDiv = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (scrollableDiv.current) {
      scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={className}
      ref={scrollableDiv}
    >
      {messages && messages.map((message, index) => renderMessage(message, index))}
    </div>
  );
};

export default ScrollableWindow;