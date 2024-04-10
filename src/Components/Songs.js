import React, { Component,useEffect,useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

class Songs extends Component {
  
    render() {
        return (
          <Container className='mt-2'>
            <Button className='btn-primary' as={Link}
      to="/songs/new">add new song</Button>
            <SongList/>
          </Container>
        );
    }
}

function SongList(){

    const [songList, setSongList] = useState([])
    useEffect(() => {
        LoadSongList();
    }, [])

    async function LoadSongList(){
      const response = ((await fetch('https://localhost:7237/Song?show=1')));
      const jsonData = await response.json();
      let tmpdate=JSON.parse(JSON.stringify(jsonData))
      await setSongList(tmpdate);
      }
      var newstate = () =>{
        console.log("called funtion");
        LoadSongList();
      };

       
    return     <>
    {songList.map(function(data) {
        const date = new Date(data.lastPlayed);

    // Get day, month, and year from the Date object
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const year = date.getFullYear();
    
        // Format the date as DD-MM-YYYY
        const formattedDate = `${day}-${month}-${year}`;

      return (
          
      <Row className='mt-2' key={date.key}>
        <Col>Song name: {data.name}</Col>
        <Col>Last played: {formattedDate}</Col>
        <Col> <PlaySongButton newstate ={newstate} song_id={data.key} show_id={1} /></Col>

      </Row>

      )
    })}
    </>
}

function PlaySongButton({newstate,song_id, show_id}){
    const onPress  = async () => {
        try {
          // Perform POST request
          const response = await fetch('https://localhost:7237/Song/played', {
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

const styles = {
    button: {
      backgroundColor: 'black',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      
    },
  };

export default Songs