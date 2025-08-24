import { createContext, useContext } from 'react';

export const ContextTask = createContext();

export const initialState = {
    task: []
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_TASKS":
      return {
        ...state,
        task: payload.data
      };
    case "GET_TASK":
      return {
        ...state,
        task: payload.data
      };
    case "UPDATE_TASK":
      return {
        ...state,
        task: state.task.map(item => 
          item.id_task === payload.id ? {
            ...item,
            task_desc: payload.desc,
            id_importance: payload.importance
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