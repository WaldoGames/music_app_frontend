import React, { Component } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';


const  ShowSelector =(selectedItem, onItemSelected)=> {
    const { user, isAuthenticated, isLoading } = useAuth0();



    


    return (
        <p>je;;p</p>
    );
}

export default ShowSelector;