import React, { useState } from 'react';
import { connect, sendToAll, sendToSpecific } from './js/webSocket';

function Chat() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);

  function handleConnect() {
    connect(username, onMessageReceived);
  }

  function onMessageReceived(message) {
    setMessages(messages => [...messages, message]);
  }

  function handleSendToAll() {
    sendToAll(message);
    setMessage('');
  }

  function handleSendToSpecific() {
    sendToSpecific(message, username);
    setMessage('');
  }

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={handleConnect}>Connect</button>

      <div>
        <textarea rows="10" value={messages.join('\n')} readOnly></textarea>
      </div>

      <div>
        <input type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handleSendToAll}>Send to all</button>
        <input type="text" placeholder="To user" value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={handleSendToSpecific}>Send to specific</button>
      </div>
    </div>
  );
}
