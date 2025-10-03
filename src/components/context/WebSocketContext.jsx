import React, { useRef, useCallback, useState, useEffect} from 'react';
import { WebSocketContext } from './ContextForWeb';
import {ApiTask} from "@/utils/ApiTask.jsx";

export const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageListeners = useRef(new Set());
  const isInitialized = useRef(false);
  const { getTask } = ApiTask();
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
    if (isInitialized.current) return;
    isInitialized.current = true;
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    getTask()
      setIsConnected(true);

    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        messageListeners.current.forEach(listener => {
          try {
            listener(message);
            console.log(message)
          } catch (error) {
            console.error('Error in message listener:', error);
          }
        });
      } catch (error) {
        console.error('WebSocket message parsing error:', error, event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, []);

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
