import  {  useReducer,  useState, useEffect, useContext} from 'react';
import { reducer, ContextTask, initialState } from './reducer/reducerCT';
import {ApiTask} from "@/utils/ApiTask.jsx";
import {createTaskActions} from "@/utils/SocketMessageAction.js";
import {createWebSocketHandlers} from "@/utils/WebSocketHandler.js";
import {useWebSocketContext} from "@/components/context/reducer/reducerSocket.jsx";


export const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState()
    const {sendMessage, addMessageListener} = useWebSocketContext();
    const {handleWebSocketMessage} = createWebSocketHandlers(dispatch);
    const { getAllTasks,createTask, updateTask, deleteTask} = createTaskActions(sendMessage);
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
                    getAllTasks(result)
                })
        } catch (e) {
            console.log(e);
        }
    }
    const handlerAdd = (taskData) => {
        try {
            handleAddTask(taskData)
            console.log("1111",taskData);

            createTask(taskData);
        } catch (e){
            console.log(e);
        }

    };
    const handlerAlert = (id, desc, id_importance) => {
        try {
             handleAlertTask(id, desc, id_importance)
            updateTask(id, desc, id_importance)
                }
         catch (e) {
            console.log(e);
        }

    };

    const handlerDelete = (taskId) => {
        try {
            handleRemoveTask(taskId).then(result => {
                    dispatch({
                        type: "GET_TASKS",
                        payload: result
                    })
            })
            deleteTask(taskId)
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