import React, { Component,useEffect,useState,useContext } from 'react';
import { ShowContext } from './Context/ShowContext';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const  Shows =()=> {

    const {isAuthenticated} = useAuth0();


    return (
        (isAuthenticated) ? 
        (<ShowList/>):
        (<h1>hoi</h1>)
    );



}
const ShowList=()=>{
    const { fetchShows, loading, showCount, shows, SelectDiffrentShow } = useContext(ShowContext);
    return (
<>      <Button className='btn-primary m-4 middle' as={Link} to="/shows/new">create a new show</Button>
        {shows.length > 0 ? (
            shows.map(function (data) {
            return (
                <Container className='mt-2' key={data.id}>
                <Row className='mt-2'>
                    <Col>Show name: {data.name}</Col>
                    <Col>Show discription: {data.discription}</Col>
                    <Col>Show language: {data.language}</Col>
                </Row>
                </Container>
            );
            })
        ) : (
            <div> no shows found... you should not be able to get where without shows.....</div> // This is the else block
        )}
        </>
    )
    //shows
}

export default Shows;