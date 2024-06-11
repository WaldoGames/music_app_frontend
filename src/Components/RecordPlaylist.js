import React, { useEffect, useState, useContext } from 'react';
import * as signalR from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import { ShowContext } from './Context/ShowContext';
import { Button, Row, Col, Container, Spinner, Card  } from 'react-bootstrap';

const RecordPlaylist = () => {
  const [connection, setConnection] = useState(null);
  const [PlaylistStatusObject, setPlaylistStatusObject] = useState({});
  const [index, setIndex] = useState(0);
  const { selectedShow } = useContext(ShowContext);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { roomGuid, playlistId } = useParams();
  const Api = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`${Api}/wsHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    connect.start()
      .then(() => {
        console.log('Connected!');
        joinRoom(connect);
        setIsConnected(true);
      })
      .catch(err => console.log('Connection failed: ', err));

    connect.on('UpdateCurrentRoomstate', (object) => {
      setPlaylistStatusObject(object);
      setLoading(false);
      console.log(object);
    });
    connect.on('Host-SendCurrentRoomstate', () => {
      console.log('hoi');
      sendCurrentRoomStatus();
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

  const joinRoom = async (connectc) => {
    if (connectc && connectc._connectionStarted) {
      await connectc.send('JoinRoom', roomGuid);
      await connectc.send('RequestCurrentRoomStatusFromHost', roomGuid);
    } else {
      console.log(connectc);
    }
  };

  const leaveRoom = async () => {
    if (connection && connection._connectionStarted) {
      await connection.send('LeaveRoom', roomGuid);
    }
  };

  const Move = async (moveAmount) => {
    console.log(moveAmount);
    setIndex(index + moveAmount);
  };

  const sendCurrentRoomStatus = async () => {
    if (connection && connection._connectionStarted) {
      console.log(`${roomGuid} + ${playlistId} + ${selectedShow.id} + ${index}`);
      await connection.send('SendCurrentRoomStatus', roomGuid, Number(playlistId), selectedShow.id, index);
    }
  };

  return (
    <Container className="text-center mt-4">
      {loading ? (
        <Spinner animation="border" role="status">
          
        </Spinner>
      ) : (
        <>
          <h2>{PlaylistStatusObject.recordingPlayListName}</h2>
          <p>{PlaylistStatusObject.playListDescription}</p>
          <div className="d-flex justify-content-center mb-3">
            {PlaylistStatusObject.firstItem !== true && (
              <Button data-cy={"pl-previous"} onClick={() => Move(-1)} variant="primary" className="me-2">Previous</Button>
            )}
            {PlaylistStatusObject.lastItem !== true && (
              <Button data-cy={"pl-next"} onClick={() => Move(1)} variant="primary">Next</Button>
            )}
          </div>
          <RecordPlaylistItemComponent
            song={PlaylistStatusObject.currentItem.song}
            description={PlaylistStatusObject.currentItem.discription}
            index={PlaylistStatusObject.currentItem.itemIndex}
          />
        </>
      )}
    </Container>
  );
};

const RecordPlaylistItemComponent = (props) => {
  return props.song != null ? (
    <div>
      <h2>Recording note {props.index}:</h2>
      <p data-cy={"pl-description"}>{props.description}</p>
      <SongComponent name={props.song.name} user_description={props.song.user_description} />
    </div>
  ) : (
    <div>
      <h2>Recording note {props.index}:</h2>
      <p data-cy={"pl-description"}>{props.description}</p>
    </div>
  );
};

const SongComponent = (props) => {
  return (
    <Card data-cy={"pl-song"} className="text-center my-3" style={{ backgroundColor: '#f8f9fa' }}>
      <Card.Body>
        <Card.Title>Song name:</Card.Title>
        <Card.Text>{props.name}</Card.Text>
        <Card.Text>{props.user_description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecordPlaylist;

