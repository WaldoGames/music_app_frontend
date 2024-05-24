import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
const RecordPlaylist = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  const { roomGuid } = useParams();
  var roomOwner = false;

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:32772/wsHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();


    connect.start()
      .then(() => {console.log('Connected!'); joinRoom(connect);}).catch(err => console.log('Connection failed: ', err));

    connect.on('ReceiveMessage', (message) => {
      console.log('hoi')
      setMessages(messages => [...messages, { message }]);
    });
    
    setConnection(connect);
    
    return () => {
      leaveRoom();
      connect.stop().then(() => console.log('Disconnected!'));
    };
  }, []);
    

  const joinRoom = async(connectc)=>{
    if (connectc && connectc._connectionStarted) {
      await connectc.send('JoinRoom', roomGuid);
    }else{
      console.log(connectc)
    }
  };
  const leaveRoom = async()=>{
    //console.log(connection);
    if (connection && connection._connectionStarted) {
      await connection.send('LeaveRoom', roomGuid);
    }
  };

  const sendMessage = async () => {

    console.log(connection);
    if (connection && connection._connectionStarted) {
      await connection.send('SendMessage', roomGuid, message);
      setMessage('');
    } else {
      alert('No connection to server yet.');
    }
  };

  return (
    <div>
      <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="User" />
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
    </div>
  );
};

export default RecordPlaylist;
