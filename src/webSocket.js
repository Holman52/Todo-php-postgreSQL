import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
    port: 5000
}, () => {
    console.log('Socket started on 5000 port');
});

wss.on('connection', function(ws){
    ws.on('message' , (message) =>{
        const content = JSON.parse(message)
        switch (content.event) {
            case 'connection':
                broadcast(content)
                break;

            case 'message':
                broadcast(content)
                break;
        }
    })
})

function broadcast(message) {
    wss.forEach(client => {
        client.send(JSON.stringify(message));
    });
}