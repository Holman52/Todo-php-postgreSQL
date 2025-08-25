import  {  useReducer,  useState } from 'react';
import { reducer, ContextTask, initialState } from './reducer/reducerCT';

export  const ItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    const [error, setError] = useState()
    const getTask = async ()=>{
        try {
            const response = await fetch('http://localhost/api/test/echo-task.php');
            if (!response.ok) {
                  throw new Error(`Network response was not ok: ${response.status}`);
            }
            const result = await response.json()
            dispatch({
              type: "GET_TASKS",
              payload: result,
            });
            } 
        catch (err) {
            setError(err.message);
            console.log(error)
        } 
    }

    const handleRemove = async (id) =>{
          try {
             console.log('Deleting item with ID:', id); // Логируем ID
    
            const response = await fetch('http://localhost/api/test/remove-task.php', {
              method: 'DELETE',
              body: JSON.stringify({ id }),
            });
            
            console.log('Delete response:', response.data); // Логируем ответ сервера
            getTask()
            } catch (err) {
              setError(err.message);
              alert('Failed to delete item');
            } 
            
    }

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
    console.log(state)
  return (
    <ContextTask.Provider value={{ 
        task,
        handleAlert,
        handleRemove,
        getTask,
     }}>
      {children}
    </ContextTask.Provider>
  );
};




