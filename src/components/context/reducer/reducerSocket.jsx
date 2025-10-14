import {createContext, useContext} from 'react';
export const WebSocketContext = createContext();

export const initialState = {
    WebTask: []
};
export const reducerSocket = (state, action) => {
    switch (action.type) {
        case 'CREATE_TASK_TASK_SUCCESS':
            console.log(action);
            return {
                ...state,
                WebTask: action.payload.data || action.payload,
            };
        case 'ADD_TASK_TASK_SUCCESS':
            console.log('ADD_TASK_TASK_SUCCESS',action);
            return {
                ...state,
                WebTask: [...state.task, action.payload],
            };
            default:
                return state;
    }
}
export const useWebSocketContext = () => {
    return useContext(WebSocketContext);
};