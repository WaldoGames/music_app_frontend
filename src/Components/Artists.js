import React, { Component,useEffect,useState,useContext } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { ShowContext } from './Context/ShowContext';
import DeleteButton from './test/DeleteButton';

function Artists({ss}){

    const [first, setfirst] = useState([])
    const { selectedShow } = useContext(ShowContext);
    const [error, setError]= useState(false);

    const Api = process.env.REACT_APP_API_PATH

    useEffect(() => {
        
        async function LoadArtistList(){
          try {
            const response = await fetch(Api+'/Artist?show='+ selectedShow.id);
            const jsonData = await response.json();
            if(response.status==400){
              throw error;
            }
            let tmpdate=JSON.parse(JSON.stringify(jsonData))
            await setfirst(tmpdate);
          } catch (error) {
            setError(true);
            console.log("ERROR: " + error);
          }
        }
        LoadArtistList();
    }, [selectedShow])

    return (
      <>
        {first.length > 0 ? (
          first.map(function(data) {
            return (
              <Container className='mt-2'>
                <Row>
                  <Col xs={4}>Artist name: {data.name}</Col>
                  <Col xs={4}>has been played {data.playedCount} times</Col>
                  
                </Row>
              </Container>
            );
          })
        ) : (
          <div className='mx-2'>No artists available</div>
        )}
      </>
    );
}

export default Artists;