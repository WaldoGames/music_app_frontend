import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
function Artists({ss}){

    const [first, setfirst] = useState([])
    const { selectedShow } = useContext(ShowContext);

    useEffect(() => {

        async function LoadArtistList(){
        const response = await fetch('https://localhost:32768/Artist?show='+ selectedShow.id);
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setfirst(tmpdate);
        }
    
        LoadArtistList();
    }, [])
    

    return (
      <>
        {first.length > 0 ? (
          first.map(function(data) {
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={6}>Artist name: {data.name}</Col>
                </Row>
              </Container>
            );
          })
        ) : (
          <div>No artists available</div>
        )}
      </>
    );
}

export default Artists;