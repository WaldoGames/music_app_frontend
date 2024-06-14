import React, { useEffect, useState, useContext } from 'react';
import * as signalR from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import { ShowContext } from './Context/ShowContext';
import { Button, Row, Col, Container, Spinner, Card  } from 'react-bootstrap';

import { useAuth0 } from '@auth0/auth0-react';

const RecordPlaylist = () => {
  const [connection, setConnection] = useState();
  const [PlaylistStatusObject, setPlaylistStatusObject] = useState({});
  const [indexWeb, setIndex] = useState(0);
  const { selectedShow } = useContext(ShowContext);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { roomGuid, playlistId } = useParams();
  const Api = process.env.REACT_APP_API_PATH;

  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, accessTokenFactory, isLoading } = useAuth0();

  //i need to have these due to a stupid limit in react
  const [StateRequestCurrentItems, SetStateRequestCurrentItem] = useState('');
  const [StateTryMoveForward, SetStateTryMoveForward] = useState('');
  const [StateTryMoveBack, SetStateTryMoveBack] = useState('');

  useEffect(() => {
    const connectToHub = async () => {

      if(!isLoading){
      if(!isAuthenticated && !isLoading){
          loginWithRedirect();
      }
              const token = await getAccessTokenSilently()
              console.log(process.env.REACT_APP_AUTH0_AUD)
              console.log(token)
              console.log('TOKEN: '+ token);
              const connection = new signalR.HubConnectionBuilder()
                  .withUrl(`${Api}/wsHub`, {
                      accessTokenFactory: () => token
                  })
                  .build();
              console.log("SignalR connected");
              
              connection.serverTimeoutInMilliseconds = 60000; // 1 minute
              connection.keepAliveIntervalInMilliseconds = 30000; // 30 seconds
      setConnection(connection);
      return () => {
        connection.stop()
          .then(() => {
            console.log('SignalR Connection Stopped.');
            connection.off('Host-Next');
            connection.off('Host-Previous');
            connection.off('Host-SendCurrentRoomstate');
            connection.off('UpdateCurrentRoomstate');
          })
          .catch(err => console.error('Error stopping SignalR connection: ', err));
      };

  };
};
    connectToHub();
  }, [isAuthenticated, loginWithRedirect, getAccessTokenSilently,isLoading]);

  useEffect(() => {
    if (isConnectionActive() && !isNaN(selectedShow.id)) {
      console.log('Connection state is connected');
      sendCurrentRoomStatus();
    } else {
      console.log('Connection state is not connected');
    }
  }, [isConnected, indexWeb, StateRequestCurrentItems]);

  useEffect(() => {

    console.log(connection)
    if (connection) {
      connection.start()
          .then(result => {
            joinRoom(connection);
              console.log('Connected!');

              connection.on('UpdateCurrentRoomstate', (object) => {
                console.log("test ;"+ indexWeb);
                setPlaylistStatusObject(object);
                console.log('killlll meeeee');
                setLoading(false);
              });
              connection.on('Host-SendCurrentRoomstate', () => {
                console.log("lololol")
                SetStateRequestCurrentItem(uuidv4());
              });
              connection.on('Host-Next', (amount) => {
                SetStateTryMoveForward(uuidv4());
              });
              connection.on('Host-Previous', (amount) => {
                SetStateTryMoveBack(uuidv4());
              });
          })
          .catch(e => console.log('Connection failed: ', e));
  }
  }, [connection]);

  useEffect(() => {
    if(!PlaylistStatusObject.firstItem&& !loading){
      setIndex(indexWeb -1);
    }
  }, [StateTryMoveBack]);

  useEffect(() => {

    if(!PlaylistStatusObject.lastItem&& !loading){
      console.log('test420 69');
      setIndex(indexWeb +1);
    }
  }, [StateTryMoveForward]);


  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  const joinRoom = async (connectc) => {
    if (connectc && connectc._connectionStarted) {
      await connectc.send('JoinRoom', roomGuid);
      await connectc.send('RequestCurrentRoomStatusFromHost', roomGuid);

    } else {
      console.log(connectc);
    }
  };

  const leaveRoom = async () => {
    console.log("leaving room")
    if (isConnectionActive()) {
      await connection.send('LeaveRoom', roomGuid);
    }
  };

  const Move = async (moveAmount) => {
    await connection.send('MoveIndex', roomGuid, moveAmount);
  };

  const sendCurrentRoomStatus = async () => {
    if (isConnectionActive() && !isNaN(selectedShow.id)) {
      await connection.send('SendCurrentRoomStatus', roomGuid, Number(playlistId), selectedShow.id, Number(indexWeb));
    }
  };
  function isConnectionActive() {
    if(!connection){
      return false;
    }

    return connection.state === signalR.HubConnectionState.Connected;
}

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

