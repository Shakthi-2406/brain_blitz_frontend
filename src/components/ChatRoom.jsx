import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      brokerURL: 'ws://localhost:8080/websocket',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    console.log("hii");
    client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      setIsConnected(true);
      const username = localStorage.getItem('username');
      setUsername(username);
      client.subscribe('/all/messages', (message) => {
        console.log('Received message: ' + message.body);
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
      client.subscribe(`/specific/${username}`, (message) => {
        console.log('Received message: ' + message.body);
        setMessages((prevMessages) => [...prevMessages, message.body]);
      });
    };

    client.onDisconnect = () => {
      console.log('Disconnected');
      setIsConnected(false);
    };

    setSocket(socket);
    setClient(client);
    
    return () => {
      client.deactivate();
    };
  }, []);

  function sendToAll(message) {
    if (isConnected) {
      client.publish({
        destination: '/app/all',
        body: message,
      });
    } else {
      console.log('Not connected');
    }
  }

  function sendToSpecific(username, message) {
    if (isConnected) {
      client.publish({
        destination: `/app/specific/${username}`,
        body: message,
      });
    } else {
      console.log('Not connected');
    }
  }

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input type="text" placeholder="Message" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={() => sendToAll('Hello everyone!')}>Send to all</button>
      <button onClick={() => sendToSpecific(username, 'Hello specific user!')}>Send to specific user</button>
    </div>
  );
}

export default ChatRoom;
