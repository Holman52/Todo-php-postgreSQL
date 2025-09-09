import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
    port: 5000
}, () => {
    console.log('Socket started on 5000 port');
});

wss.on('connection', function(ws){
    ws.on('message' , (message) =>{
        const content = JSON.parse(message)
        switch (content.type) {
            case 'TASK_CREATED':
                broadcast(content)
                break;
            case 'TASK_UPDATED':
                broadcast(content)
                break;
            case 'TASK_DELETED':
                broadcast(content)
                break;
        }
    })
})

function broadcast(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
    }
  });
}