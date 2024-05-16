import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';

function Playlists({ss}){

    const [playlist, setPlaylist] = useState([])
    const { selectedShow } = useContext(ShowContext);

    useEffect(() => {

        async function LoadPlaylists(){
        const response = await fetch('https://localhost:32768/Playlist?show='+ selectedShow.id);
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setPlaylist(tmpdate);
        }
    
        LoadPlaylists();
    }, [selectedShow])
    
    console.log(playlist);
    return (
      <>
      
        {'playListItems' in playlist && playlist.playListItems.length > 0 ? (
          playlist.playListItems.map(function(data) {
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={6}>{data.playListName}</Col>
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