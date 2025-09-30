import  {  useReducer,  useState, useEffect, useContext} from 'react';
import { reducer, ContextTask, initialState } from './reducer/reducerCT';
import { WebSocketContext } from './ContextForWeb';
import getTask, {handleAdd} from "@/utils/ActionTask.jsx";

export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    const [error, setError] = useState()
    const { sendMessage, addMessageListener } = useContext(WebSocketContext);
    useEffect(() => {
    const unsubscribe = addMessageListener((message) => {
      console.log('📨 Получено сообщение:', message);
      switch (message.type) {
        case 'TASKS_LIST':
          dispatch({ type: 'SET_TASKS', payload: message.data });
          break;

        case 'TASK_CREATED':
          dispatch({ type: 'ADD_TASK', payload: message.data });
          break;

        case 'TASK_UPDATED':
          dispatch({ type: 'UPDATE_TASK', payload: message.data });
          break;

        case 'TASK_DELETED':
          dispatch({ type: 'DELETE_TASK', payload: message.data.id });
          break;

        default:
          console.log('Неизвестный тип сообщения:', message.type);
      }
    });

    
    return unsubscribe;
  }, [addMessageListener]);
  const createTask = (taskData) => {
    sendMessage({
      type: 'TASK_CREATED',
      data: taskData
    });
  };

const updateTask = (taskId, updates) => {
  sendMessage({
    type: 'TASK_UPDATED',
    data: { id: taskId, ...updates }
  });
};

const deleteTask = (taskId) => {
  sendMessage({
    type: 'DELETE_TASK',
    data: { id: taskId }
  });
};


    // const handleRemove = async (id) =>{
    //       try {
    //          console.log('Deleting item with ID:', id);
    //
    //         const response = await fetch('http://localhost/api/test/remove-task.php', {
    //           method: 'DELETE',
    //           body: JSON.stringify({ id }),
    //         });
    //
    //         console.log('Delete response:', response.data);
    //         getTask()
    //         } catch (err) {
    //           setError(err.message);
    //           alert('Failed to delete item');
    //         }
    // }
    //
    
    const handleAlert = async (id,desc,id_importance) =>{
      try{
        console.log('Alert item with id:', id)
        const response = await fetch('http://localhost/api/test/alert-task.php' ,{
          method: 'PUT',
          body: JSON.stringify({
            id:id,
            desc: desc, 
            importance: id_importance})
        })
        if (!response.ok) {
          throw new Error('Ошибка при отправке формы');
        }
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: id,
                    desc: desc,
                    importance: id_importance
                }
            });

        console.log('Alerted to completed')
   
      }catch (err){
        setError(err.message)
        console.log(Error)
      }
    } 
    if (error) return <div>Error: {error}</div>;
    const task= state.task
  return (
    <ContextTask.Provider value={{ 
        task,
        handleAlert,
        handleRemove,
        getTask,
        handleAdd,
        updateTask,
        deleteTask,
        createTask,
     }}>
      {children}
    </ContextTask.Provider>
  );
};