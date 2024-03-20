import React, { Component,useEffect,useState } from 'react';

class Songs extends Component {
    render() {
        return (
            <div>
                <SongList/>
            </div>
        );
    }
}

function SongList(){

    const [first, setfirst] = useState([])


    useEffect(() => {

        async function LoadSongList(){
        const response = ((await fetch('https://localhost:7237/getSongs?ShowId=1')));
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setfirst(tmpdate);
        }
    
        LoadSongList();
    }, [])
    

    return     <>
    <ul>
    {first.map(function(data) {
      return (
        <li key={data.key}>

          <div className='songname'>
            <p>Song name: {data.name}</p>
            <PlaySongButton song_id={data.key} show_id={1} />
          </div>

        </li>
      )
    })}
    </ul>
    </>
}

function PlaySongButton({song_id, show_id}){

    const onPress  = async () => {
        try {
          // Perform POST request
          const response = await fetch('https://localhost:7237/playSongOnShow', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId: song_id, showId: show_id }),
          });
    
          if (!response.ok) {
            console.error('Failed to save played song data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return <>
    <button onClick={onPress} style={styles.button}>
    Play song
    </button>
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