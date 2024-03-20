import React, { Component,useEffect,useState } from 'react';

class Artists extends Component {
    
    
    
    render() {
        return (
            <div>
                <ArtistsList/>
            </div>
        );
    }
}
function ArtistsList(){

    const [first, setfirst] = useState([])


    useEffect(() => {

        async function LoadArtistList(){
        const response = ((await fetch('https://localhost:7237/getArtists?ShowId=1')));
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setfirst(tmpdate);
        }
    
        LoadArtistList();
    }, [])
    

    return     <>
    <ul>
    {first.map(function(data) {
      return (
        <li key={data.key}>
          artist name:  {data.name}
        </li>
      )
    })}
    </ul>
    </>
}

export default Artists;