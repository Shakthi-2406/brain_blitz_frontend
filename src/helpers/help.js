

const socket = new SockJS('http://localhost:8080/websocket');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    const userId = // user ID of the current user
    stompClient.subscribe('/all/messages', function(message) {
        console.log('Received message: ' + message.body);
    });
    stompClient.subscribe(`/specific/${userId}`, function(message) {
        console.log('Received message: ' + message.body);
    });
});

function sendToAll(message) {
    stompClient.send('/app/all', {}, message);
}

function sendToSpecific(userId, message) {
    stompClient.send(`/app/specific/${userId}`, {}, message);
} 