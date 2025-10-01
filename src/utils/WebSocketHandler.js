export const createWebSocketHandlers = (dispatch) => ({
    handleWebSocketMessage: (message) => {
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
    }
});