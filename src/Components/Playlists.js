import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
import { Link } from 'react-router-dom';
import ErrorComponent from './ErrorComponent'


function Playlists({ss}){

    const [playlist, setPlaylist] = useState([])
    const [state, chancedState] = useState(0)
    const { selectedShow } = useContext(ShowContext);
    const Api = process.env.REACT_APP_API_PATH
    const [error, setError]= useState(false);

    useEffect(() => {

        async function LoadPlaylists(){
          try {
            const response = await fetch(Api+'/Playlist?show='+ selectedShow.id);
            const jsonData = await response.json();
            let tmpdate=JSON.parse(JSON.stringify(jsonData))
            await setPlaylist(tmpdate);

          } catch (error) {
            setError(true);
            console.log(error);
          }

        }
    
        LoadPlaylists();
    }, [selectedShow, state])
    
    async function handleDelete(deleteId){
      try {
        const response = await fetch(Api+'/Playlist/'+deleteId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          console.error('Failed delete playlist');
          
        }else{
          chancedState(state+1);
        }
      } catch (error) {
          console.log(error);
      }
    }

    console.log(playlist);
    if(error == true){
      return <ErrorComponent/>
    }
    return (
      <>
          {(selectedShow!==null&&selectedShow!=='') && (
        <Button data-cy="playlistnew" className='btn-primary m-4 middle' as={Link} to="/playlists/new">create a new playlist</Button>
          )}
        
        {'playListItems' in playlist && playlist.playListItems.length > 0 ? (
          playlist.playListItems.map(function(data) {
            console.log(data);
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={6}>{data.playListName}</Col>
                  <Col><Link  data-cy={"pl-run"} to={"/playlist/room/"+crypto.randomUUID()+"/"+ data.playListId}>CreateRecording</Link></Col>
                  <Col><Button data-cy={"pl-delete"} onClick={() => handleDelete(data.playListId)} variant='primary' size="sm">
                  Delete
                  </Button></Col>
                </Row>
              </Container>
            );
          })
        ) : (
          <div  className='mx-2'>No playlists available</div>
        )}

      </>
    );
}

export default Playlists;