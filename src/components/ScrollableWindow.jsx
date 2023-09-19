import React, { useEffect, useRef } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
const ScrollableWindow = ({ className, topic, messages, renderMessage, loading }) => {
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
      style={{position:'relative'}}
    >

      {messages && messages.map((message, index) => renderMessage(message, index))}

      {loading && <CircularProgress 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '45%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }}
                    size="60px"/>}
    </div>
  );
};

export default ScrollableWindow;