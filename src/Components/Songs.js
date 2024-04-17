import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ShowContext } from './Context/ShowContext';

function Songs({ ss }) {
  const [songList, setSongList] = useState([]);
  const { selectedShow } = useContext(ShowContext);

  useEffect(() => {
    LoadSongList();
  }, [selectedShow]);

  async function LoadSongList() {
    try {
      console.log(selectedShow.id);
      const response = await fetch('https://localhost:32768/Song?show=' + selectedShow.id);
      const jsonData = await response.json();
      setSongList(jsonData);
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  }

  const newstate = () => {
    console.log("called function");
    LoadSongList();
  };

  return (
    <>
      <Button className='btn-primary m-4 middle' as={Link} to="/songs/new">add new song</Button>
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
                <Col>Song name: {data.name}</Col>
                <Col>Last played: {formattedDate}</Col>
                <Col><PlaySongButton newstate={newstate} song_id={data.key} show_id={selectedShow.id} /></Col>
              </Row>
            </Container>
          );
        })
      ) : (
        <div>No songs available</div> // This is the else block
      )}
    </>
  );
}
function PlaySongButton({newstate,song_id, show_id}){
  const onPress  = async () => {
      try {
        // Perform POST request
        const response = await fetch('https://localhost:32768/Song/played', {
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