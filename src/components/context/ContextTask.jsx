import  {  useReducer,  useState, useEffect, useContext} from 'react';
import { reducer, ContextTask, initialState } from './reducer/reducerCT';
import { WebSocketContext } from './ContextForWeb';
import {ApiTask} from "@/utils/ApiTask.jsx";
import {createTaskActions} from "@/utils/SocketMessageAction.js";
import {createWebSocketHandlers} from "@/utils/WebSocketHandler.js";


export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState()
    const {sendMessage, addMessageListener} = useContext(WebSocketContext);
    const {handleWebSocketMessage} = createWebSocketHandlers(dispatch);
    const {createTask, updateTask, deleteTask} = createTaskActions(sendMessage);
<<<<<<< HEAD
    const { handleAddTask, handleAlertTask, handleRemoveTask } = ApiTask();
=======
    const {  handleAddTask, handleAlertTask, handleRemoveTask } = ApiTask();
>>>>>>> 8f5de33bf89acfdd4f09a6e3c881b17b610b6f7a
    useEffect(() => {
        const unsubscribe = addMessageListener((message) => {
            handleWebSocketMessage(message);
        })
        return unsubscribe
    }, [addMessageListener]);
    const handlerAdd = (taskData) => {
        try {
            const result = handleAddTask(taskData);
            createTask(result);
        } catch (error) {
            console.error(error.message);
        }

    };
    const handlerAlert = (id, desc, id_importance) => {
        try {
            const result = handleAlertTask(id, desc, id_importance);
            updateTask(id, desc, id_importance)
            return  result
        } catch (e) {
            console.log(e.message)
        }

    };

    const handlerDelete = (taskId) => {
        try {
            const result = handleRemoveTask(taskId);
            deleteTask(taskId);
            return  result

        } catch (e) {
            console.log(e.message)

        }
    };
<<<<<<< HEAD
    console.log(state.task)
=======
    console.log(state)
>>>>>>> 8f5de33bf89acfdd4f09a6e3c881b17b610b6f7a
        if (error) return <div>Error: {error}</div>;
        return (
            <ContextTask.Provider value={{
                task: state.task,
                updateTask,
                deleteTask,
                createTask,
                handlerDelete,
                handlerAlert,
                handlerAdd
            }}>
                {children}
            </ContextTask.Provider>
        );
}