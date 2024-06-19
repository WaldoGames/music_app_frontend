import React, { Component,useEffect,useState,useContext } from 'react';
import { ShowContext } from './Context/ShowContext';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import DeleteButton from './test/DeleteButton';

const  Shows =()=> {

    const {isAuthenticated} = useAuth0();


    return (
        (isAuthenticated) ? 
        (<ShowList/>):
        (<h1>hoi</h1>)
    );



}
const ShowList=()=>{
    const { fetchShows, loading, showCount, shows, SelectDiffrentShow, error } = useContext(ShowContext);
    const Api = process.env.REACT_APP_API_PATH
    const newstate = () => {
        console.log("called function");
        fetchShows();
      };

    async function handleDelete(deleteId){
        try {
          const response = await fetch(Api+'/Show?ShowId='+deleteId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            console.error('Failed delete show');
            
          }else{
            newstate();
          }
        } catch (error) {
            console.log(error);
        }
      }

    if(error == true){
        return <ErrorComponent/>
      }
      console.log('shows: '+shows.length )
    return (
<>      <Button data-cy="show-new" className='btn-primary m-4 middle' as={Link} to="/shows/new">create a new show</Button>
        {shows.length > 0 ? (
            
            shows.map(function (data) {
            return (
                <Container className='mt-2' key={data.id}>
                <Row className='mt-2'>
                    <Col data-cy="show-name">Show name: {data.name}</Col>
                    <Col>Show discription: {data.discription}</Col>
                    <Col>Show language: {data.language}</Col>
                    {shows.length > 1 ? (
                        <Col><DeleteButton confirm={handleDelete} id={data.id} message={"Are you sure you want to delete show? this can't be undone and will remove all data related to the show"}>Delete</DeleteButton></Col>
                    ) : (
                        <></>
                    )}

                </Row>
                </Container>
            );
            })
        ) : (
            <div className='mx-2'> no shows found</div> // This is the else block
        )}
        </>
    )
    //shows
}

export default Shows;