import React, { useEffect, useState, useContext } from 'react';
import * as signalR from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import { ShowContext } from './Context/ShowContext';

const RecordPlaylist = () => {
  const [connection, setConnection] = useState(null);
  const [PlaylistStatusObject, setPlaylistStatusObject] = useState({});
  const [index, setIndex] = useState(0);
  const { selectedShow } = useContext(ShowContext);

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const { roomGuid,playlistId  } = useParams();
  var roomOwner = false;
  const Api = process.env.REACT_APP_API_PATH

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(Api+"/wsHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();


    connect.start()
      .then(() => {console.log('Connected!'); joinRoom(connect); setIsConnected(true);}).catch(err => console.log('Connection failed: ', err));

    connect.on('UpdateCurrentRoomstate', (object) => {
      setPlaylistStatusObject(object);
      setLoading(false)
      console.log(PlaylistStatusObject);
    });
    
    setConnection(connect);
    
    return () => {
      leaveRoom();
      setIsConnected(false);
      connect.stop().then(() => console.log('Disconnected!'));
    };
  }, []);

  useEffect(() => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      console.log('Connection state is connected');
      sendCurrentRoomStatus();
    } else {
      console.log('Connection state is not connected');
    }
  }, [isConnected, index]);

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

  const Move = async (moveAmount) => {
    console.log(moveAmount)
    setIndex(index+moveAmount);
  };

  const sendCurrentRoomStatus = async () => {

    if (connection && connection._connectionStarted) {
      console.log(roomGuid+ " + " +playlistId+" + "+selectedShow.id+" + " +index);
      await connection.send('SendCurrentRoomStatus', roomGuid, Number(playlistId), selectedShow.id, index);
      //setLoading(true);
    }
  };
  return (loading)? (<p>loading</p>):(
    <div >
      <h2 className="text-center">{PlaylistStatusObject.recordingPlayListName}</h2>
      <div class="h-100 d-flex align-items-center justify-content-center">
      <p className="w-50 text-center">{PlaylistStatusObject.playListDescription}</p>
      

      </div>
      <RecordPlaylistItemComponent discription={PlaylistStatusObject.currentItem.discription} index={PlaylistStatusObject.currentItem.itemIndex}/>
      {PlaylistStatusObject.firstItem !== true && <button onClick={() => Move(-1)}>previous</button>}
      {PlaylistStatusObject.lastItem !== true && <button onClick={() => Move(1)}>next</button>}
    </div>
  );
};

const RecordPlaylistItemComponent= (props)=>{

  return (
    <div >
      <h2 className="text-center">recording note {props.index}:</h2>
      <p className="text-center">{props.discription}</p>
    </div>
  );
}
const SongComponent=(props)=>{

}

export default RecordPlaylist;
