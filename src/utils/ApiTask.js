
export const ApiTask =  {
     getTask: async ()=>{
        try {
            const response = await fetch('http://localhost/api/test/echo-task.php');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const result = await response.json()
            // dispatch({
            //   type: "GET_TASKS",
            //   payload: result,
            // });
        }
        catch (err) {
            console.log(err.message);
        }
        return result
    },
    handleAdd: async (// formData, createTask
     ) => {
        const response = await fetch('http://localhost/api/test/post_method.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Ошибка при отправке формы');
        }

        return response.json(); // или response.json() если сервер возвращает данные
    },
    handleAlertTask: async (id,desc,id_importance) =>{
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
            // dispatch({
            //     type: "UPDATE_TASK",
            //     payload: {
            //         id: id,
            //         desc: desc,
            //         importance: id_importance
            //     }
            // });

            console.log('Alerted to completed')

        }catch (err){
            console.log(err.message)
        }
    },
    handleRemove: async (id) =>{
        try {
            console.log('Deleting item with ID:', id);

            const response = await fetch('http://localhost/api/test/remove-task.php', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });

            console.log('Delete response:', response.data);
        } catch (err) {
            console.log(err.message);
            alert('Failed to delete item');
        }
    }
}