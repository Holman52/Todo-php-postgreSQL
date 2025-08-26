import { createContext, useContext } from 'react';

export const ContextTask = createContext();

export const initialState = {
    task: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        task: action.payload.data || action.payload
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        task: state.task.filter(item => item.id != action.payload)
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