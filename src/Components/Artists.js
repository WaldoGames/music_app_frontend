import React, { Component,useEffect,useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
class Artists extends Component {
    
    
    
    render() {
        return (
            <div>
                <Container className='mt-2'>
                  <ArtistsList/>
                </Container>
            </div>
        );
    }
}
function ArtistsList(){

    const [first, setfirst] = useState([])


    useEffect(() => {

        async function LoadArtistList(){
        const response = ((await fetch('https://localhost:32776/Artist?show=1')));
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setfirst(tmpdate);
        }
    
        LoadArtistList();
    }, [])
    

    return     <>
    {first.map(function(data) {
      return (

        <Row >
          <Col xs={6}>Artist name: {data.name}</Col>
        </Row>
      )
    })}
    </>
}

export default Artists;