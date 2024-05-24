import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
import { Link } from 'react-router-dom';

function Playlists({ss}){

    const [playlist, setPlaylist] = useState([])
    const { selectedShow } = useContext(ShowContext);
    const Api = process.env.REACT_APP_API_PATH

    useEffect(() => {

        async function LoadPlaylists(){
        const response = await fetch(Api+'/Playlist?show='+ selectedShow.id);
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setPlaylist(tmpdate);
        }
    
        LoadPlaylists();
    }, [selectedShow])
    
    console.log(playlist);
    return (
      <>
        <Button className='btn-primary m-4 middle' as={Link} to="/playlists/new">create a new playlist</Button>

        {'playListItems' in playlist && playlist.playListItems.length > 0 ? (
          playlist.playListItems.map(function(data) {
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={6}>{data.playListName}</Col>
                  <Col><Link to={"/playlist/room/"+crypto.randomUUID()}>CreateRecording</Link></Col>
                </Row>
              </Container>
            );
          })
        ) : (
          <div>No playlists available</div>
        )}
      </>
    );
}

export default Playlists;