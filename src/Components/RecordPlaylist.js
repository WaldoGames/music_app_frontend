import React, { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { ShowContext } from './Context/ShowContext';

const RecordPlaylist = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [websocket, setWebsocket] = useState(null);
    const WebsocketPath = process.env.REACT_APP_API_PATH

    useEffect(() => {
        console.log(WebsocketPath);
      const ws = new WebSocket(WebsocketPath+'/ws');
      setWebsocket(ws);
  
      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      ws.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
        console.log(event.data);
      };
  
      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      return () => {
        ws.close();
      };
    }, []);
  
    const sendMessage = () => {
      if (websocket && input) {
        websocket.send(input);
        setInput('');
      }
    };
};

export default RecordPlaylist;
