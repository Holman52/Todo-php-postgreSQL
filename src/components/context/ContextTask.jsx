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
    const { getTask,handleAddTask, handleAlertTask, handleRemoveTask } = ApiTask();

    useEffect(() => {
        const unsubscribe = addMessageListener((message) => {
            handleWebSocketMessage(message);
        })
        return unsubscribe
    }, [addMessageListener]);

    const  getTasks = () => {
        try {
            getTask()
                .then(result => {
                    console.log(result);
                    dispatch({
                        type: "GET_TASKS",
                        payload: result
                    })
                })
        } catch (error) {
            console.error(error.message);
        }
    }
    const handlerAdd = (taskData) => {
        try {
            handleAddTask(taskData)
                .then(taskData => {
                    dispatch({
                        type: "ADD_TASK",
                        payload: taskData,
                    })
                });

            createTask(taskData);
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

    console.log(state)

        if (error) return <div>Error: {error}</div>;
        return (
            <ContextTask.Provider value={{
                task: state.task,
                getTasks,
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