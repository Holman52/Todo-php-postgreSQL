import { createContext, useContext } from 'react';

export const ContextTask = createContext();

export const initialState = {
    task: []
};

export const reducer = (state, action) => {
    console.log('REDUCER ACTION:', action.type, 'PAYLOAD:', action.payload);
    console.log('PREV STATE:', state);
  switch (action.type) {
    case "GET_TASKS":
        const newState = {
            ...state,
            task: action.payload,
        };
        console.log('NEW STATE:', newState);
        return newState;

    case 'ADD_TASK':
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        task: state.task.filter(item => item.id !== action.payload)
      };
    case "UPDATE_TASK":
      return {
        ...state,
        task: state.task.map(item => 
          item.id_task === action.payload.id ? {
            ...item,
            task_desc: action.payload.desc,
            id_importance: action.payload.importance
          } : item
        )
      };
    default:
      return state;
  }
};
export const useContextTask = () => {
  return useContext(ContextTask);
};