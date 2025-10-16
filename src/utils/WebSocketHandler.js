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

            case 'UPDATE_TASK':
                dispatch({ type: 'UPDATE_TASK', payload: message.data });
                break;

            case 'DELETE_TASK':
                dispatch({ type: 'DELETE_TASK', payload: message.data.id });
                break;

            default:
                console.log('Неизвестный тип сообщения:', message.type);
        }
    }
});