import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;

export function connect(username, onMessageReceived) {
    const socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
  
    stompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/all/messages', function(message) {
        console.log(message.body);
        onMessageReceived(JSON.parse(message.body));
      });

      //functionalities

      stompClient.subscribe(`/func/joined/${username}`, function(message) {
        onMessageReceived(message.body);
      });

      stompClient.subscribe(`/func/began/${username}`, function(message) {
        console.log(message.body);
      });

      stompClient.subscribe(`/func/buzzered/${username}`, function(message) {
        console.log(message.body);
      });

      stompClient.subscribe(`/func/result/${username}`, function(message) {
        console.log(message.body);
      });

      stompClient.subscribe(`/specific/${username}`, function(message) {
        console.log(message.body);
      });
    });
  }

  export function sendToAll(message) {
    if (stompClient) {
      stompClient.send('/app/all', {}, message);
    }
  }
  
  export function sendToSpecific(message, username) {
    if (stompClient) {
      stompClient.send(`/app/specific/${username}`, {}, message);
    }
  }
  