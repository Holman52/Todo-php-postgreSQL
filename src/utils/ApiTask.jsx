import {useReducer} from "react";

import { reducer,  initialState } from '../components/context/reducer/reducerCT.jsx';

export const ApiTask = () => {
     const [state, dispatch] = useReducer(reducer, initialState)
     const getTask = async ()=>{
         try {
            const response = await fetch('http://localhost/api/test/echo-task.php');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const result = await response.json();
           return result;
        }
        catch (err) {
            console.log(err.message);
        }
    }``
    const handleAddTask= async ( formData
     ) => {
        const response = await fetch('http://localhost/api/test/post_method.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        return  result
        if (!response.ok) {
            throw new Error('Ошибка при отправке формы');
        }
    }
    const handleAlertTask = async (id,desc,id_importance) =>{
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
            console.log(state)

            console.log('Alerted to completed')

        }catch (err){
            console.log(err.message)
        }
    }
    const handleRemoveTask= async (id) =>{
        try {
            console.log('Deleting item with ID:', id);

            const response = await fetch('http://localhost/api/test/remove-task.php', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });
            dispatch({
                type: "REMOVE_TASK",
                payload: id
            })
            console.log('Delete response:', response.data);
        } catch (err) {
            console.log(err.message);
            alert('Failed to delete item');
        }
    }

    console.log(state)
    return {
        state,
        getTask,
        handleAddTask,
        handleAlertTask,
        handleRemoveTask
    };

}