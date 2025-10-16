import React, {useRef, useCallback, useState, useEffect, useReducer} from 'react';
import {ApiTask} from "@/utils/ApiTask.jsx";
import { reducerSocket, WebSocketContext, initialState } from './reducer/reducerSocket.jsx';

export const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const [state, dispatch] = useReducer(reducerSocket, initialState);
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

    ws.current.onopen = async () => {
      console.log('WebSocket connected');
      setIsConnected(true);
        const tasks = await getTask();
        dispatch({
            type: 'CREATE_TASK_TASK_SUCCESS',
            payload: tasks,
        })
    };
    console.log(state.WebTask);
    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.current.onmessage = async (event) => {
        try {
            const message = JSON.parse(event.data);
            console.log("WebSocket сообщение:", message);
                const tasks = await getTask();
                console.log('Dimasik  ',tasks);
                dispatch({
                    type: 'CREATE_TASK_TASK_SUCCESS',
                    payload: tasks,
                })
                messageListeners.current.forEach(listener => {
                    listener(tasks);
                });


        } catch (error) {
            console.error('WebSocket message parsing error:', error, event.data);
        }
    };
    console.log('WebSocket disconnected', state.WebTask);
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{
        WebSocketTask: state.WebTask,
        sendMessage,
        addMessageListener,
        isConnected
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext
