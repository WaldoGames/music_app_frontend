import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ShowContext } from './Context/ShowContext';
import DeleteButton from './test/DeleteButton';
import ErrorComponent  from './ErrorComponent';

function Songs({ ss }) {
  const Api = process.env.REACT_APP_API_PATH
  const [songList, setSongList] = useState([]);
  const { selectedShow } = useContext(ShowContext);
  const [error, setError]= useState(false);

  useEffect(() => {
    LoadSongList();
  }, [selectedShow]);

  async function LoadSongList() {
    try {
      console.log(selectedShow.id);
      const response = await fetch(Api+'/Song/fromshow?show=' + selectedShow.id);
      const jsonData = await response.json();
      setSongList(jsonData);
    } catch (error) {
      setError(true);
      console.error('Error fetching song list:', error);
    }
  }

  const newstate = () => {
    console.log("called function");
    LoadSongList();
  };
  async function handleDelete(deleteId){
    try {
      const response = await fetch(Api+'/Song?songId='+deleteId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Failed delete playlist');
        
      }else{
        newstate();
      }
    } catch (error) {
        console.log(error);
    }
  }
  console.log(selectedShow)
  if(error == true){
    return <ErrorComponent/>
  }
  return (
    <> 

      {(selectedShow!==null&&selectedShow!=='') && (
        <Button data-cy="songnew" className='btn-primary m-4 middle' as={Link} to="/songs/new">add new song</Button>
      )}
      {songList.length > 0 ? (
        songList.map(function (data) {
          const date = new Date(data.lastPlayed);
          // Get day, month, and year from the Date object
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
          const year = date.getFullYear();
          // Format the date as DD-MM-YYYY
          const formattedDate = `${day}-${month}-${year}`;

          return (
            <Container className='mt-2' key={data.key}>
              <Row className='mt-2'>
                <Col data-cy="songNameCol">Song name: {data.name}</Col>
                <Col>Last played: {formattedDate}</Col>
                <Col>times played: {data.amountPlayed}</Col>
                <Col><PlaySongButton newstate={newstate} song_id={data.key} show_id={selectedShow.id} /></Col>
                <Col><Link to={"/songs/edit/"+data.key}>Edit</Link></Col>
                <Col><DeleteButton confirm={handleDelete} id={data.key} message={"Are you sure you want to delete this song? this will delete all related date including when the song has been played and all playlist which contain this song!"}>Edit</DeleteButton></Col>
              </Row>
            </Container>
          );
        })
      ) : (
        <div className='mx-2'>No songs available</div> // This is the else block
      )}
    </>
  );
}
function PlaySongButton({newstate,song_id, show_id}){
  const Api = process.env.REACT_APP_API_PATH

  const onPress  = async () => {
      try {
        // Perform POST request
        const response = await fetch(Api+'/Song/played', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songId: song_id, showId: show_id }),
        });
      
        newstate();
        if (!response.ok) {
          console.error('Failed to save played song data');
          
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return <>
  <Button onClick={onPress} variant='primary' size="sm">
  Play song
  </Button>
  </>
};

export default Songs;