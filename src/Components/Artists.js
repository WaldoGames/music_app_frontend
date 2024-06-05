import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
function Artists({ss}){

    const [first, setfirst] = useState([])
    const { selectedShow } = useContext(ShowContext);

    const Api = process.env.REACT_APP_API_PATH

    useEffect(() => {
        try {
        async function LoadArtistList(){
        const response = await fetch(Api+'/Artist?show='+ selectedShow.id);
        const jsonData = await response.json();
        let tmpdate=JSON.parse(JSON.stringify(jsonData))
        await setfirst(tmpdate);
        }
        LoadArtistList();
      } catch (error) {
      }
    }, [selectedShow])
    

    return (
      <>
        {first.length > 0 ? (
          first.map(function(data) {
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={6}>Artist name: {data.name}</Col>
                  <Col xs={6}>has been played {data.playedCount} times</Col>
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