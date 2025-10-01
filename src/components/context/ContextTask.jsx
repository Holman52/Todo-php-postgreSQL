import  {  useReducer,  useState, useEffect, useContext} from 'react';
import { reducer, ContextTask, initialState } from './reducer/reducerCT';
import { WebSocketContext } from './ContextForWeb';
import {ApiTask} from "@/utils/ApiTask.js";
import {createTaskActions} from "@/utils/SocketMessageAction.js";
import {createWebSocketHandlers} from "@/utils/WebSocketHandler.js";


export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState()
    const {sendMessage, addMessageListener} = useContext(WebSocketContext);
    const {handleWebSocketMessage} = createWebSocketHandlers(dispatch);
    const {createTask, updateTask, deleteTask} = createTaskActions(sendMessage);

    useEffect(() => {
        const unsubscribe = addMessageListener((message) => {
            handleWebSocketMessage(message);
        })
        return unsubscribe
    }, [addMessageListener]);
    const handlerAdd = (taskData) => {
        try {
            const result = ApiTask.handleAdd(taskData);
            createTask(result);
        } catch (error) {
            console.error(error.message);
        }

    };

    const handlerAlert = (id, desc, id_importance) => {
        try {
            ApiTask.handleAlertTask(id, desc, id_importance);
            updateTask(id, desc, id_importance)
        } catch (e) {
            console.log(e.message)
        }

    };

    const handlerDelete = (taskId) => {
        try {
            ApiTask.handleRemove(taskId);
            deleteTask(taskId);
        } catch (e) {
            console.log(e.message)

        }
    };


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