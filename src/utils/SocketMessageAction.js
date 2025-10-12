export const createTaskActions = (sendMessage) => ({
    getAllTasks: (taskData) => {
        sendMessage({
            type: 'TASKS_LIST',
            data: taskData
        });
    },
    createTask: (taskData) => {
        sendMessage({
            type: 'TASK_CREATED',
            data: taskData
        });
    },

    updateTask: (taskId, desc,id_importance) => {
        sendMessage({
            type: 'UPDATE_TASK',
            data: { id:taskId,
                desc: desc,
                importance: id_importance }
        });
    },

    deleteTask: (taskId) => {
        sendMessage({
            type: 'DELETE_TASK',
            data: { id: taskId }
        });
    },
});