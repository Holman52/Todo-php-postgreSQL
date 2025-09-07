import React, { createContext, useRef, useCallback, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, url }) => {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageListeners = useRef(new Set());

  const sendMessage = useCallback((message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  }, []);

  const addMessageListener = useCallback((listener) => {
    messageListeners.current.add(listener);
    return () => messageListeners.current.delete(listener);
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(url);

    const handleOpen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    const handleClose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        messageListeners.current.forEach(listener => {
          try {
            listener(message);
          } catch (error) {
            console.error('Error in message listener:', error);
          }
        });
      } catch (error) {
        console.error('WebSocket message parsing error:', error, event.data);
      }
    };

    const handleError = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.addEventListener('open', handleOpen);
    ws.current.addEventListener('close', handleClose);
    ws.current.addEventListener('message', handleMessage);
    ws.current.addEventListener('error', handleError);

    return () => {
      if (ws.current) {
        ws.current.removeEventListener('open', handleOpen);
        ws.current.removeEventListener('close', handleClose);
        ws.current.removeEventListener('message', handleMessage);
        ws.current.removeEventListener('error', handleError);
        
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      }
    };
  }, [url]);

  const value = {
    sendMessage,
    addMessageListener,
    isConnected
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext