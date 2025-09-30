    const getTask = async (setError)=>{
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
            console.log(err.message);
        }
    }
    export const getTask = async () => {
        const response = await fetch('http://localhost/api/test/get-tasks.php', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении задач');
        }
        return response.json();
    };

    // Или интегрировать с нашим api объектом
    export { api } from './api';
    export default getTask;
    export const handleAdd = async (formData, createTask) => {
        const response = await fetch('http://localhost/api/test/post_method.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        createTask(formData)
        if (!response.ok) {
            throw new Error('Ошибка при отправке формы');
        }

        return formData; // или response.json() если сервер возвращает данные
    }
