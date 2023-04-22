import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;

export function connect(username, onMessageReceived) {
    const socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
  
    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/all/messages', function(message) {
        onMessageReceived(message.body);
      });
      stompClient.subscribe(`/specific/${username}`, function(message) {
        onMessageReceived(message.body);
      });
    });
  }

export function sendToAll(message) {
  stompClient.send('/app/all', {}, message);
}

export function sendToSpecific(message, username) {
  stompClient.send(`/app/specific/${username}`, {}, message);
}
